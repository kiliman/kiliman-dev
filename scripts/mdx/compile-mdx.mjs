import { remarkCodeHike } from '@code-hike/mdx'
import { Command } from 'commander/esm.mjs'
import * as crypto from 'crypto'
import { config } from 'dotenv'
import * as fs from 'fs'
import * as fsp from 'fs/promises'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { createRequire } from 'module'
import fetch from 'node-fetch'
import * as path from 'path'
import * as React from 'react'
import { renderToString } from 'react-dom/server.js'
const require = createRequire(import.meta.url)
const theme = require('shiki/themes/github-dark-dimmed.json')

;(async function () {
  config()
  const program = new Command()
  program
    .option('-R, --root <path>', 'Root path (content is relative to root')
    .option('-f, --file [files...]', 'Files to compile')
    .option('-j, --json', 'Output JSON')
    .option('--api <url>', 'API URL')
    .option('--key <key>', 'API Key')

  program.parse(process.argv)
  const options = program.opts()

  process.env.API_URL = options.api ?? process.env.API_URL
  process.env.POST_API_KEY = options.key ?? process.env.POST_API_KEY

  if (!process.env.API_URL) {
    console.error('missing API_URL')
    process.exit(1)
  }

  const rootPath = options.root ?? process.cwd()
  const mdxPaths = options.file
  const results = {}
  let hasError = false
  const processed = {}
  const seriesMap = new Map()
  // process files until empty
  while (mdxPaths.length) {
    let mdxPath = mdxPaths[0]
    let originalPath = mdxPath
    try {
      if (processed[originalPath]) continue

      // remove index.mdx from path
      if (mdxPath.endsWith('/index.mdx')) {
        mdxPath = mdxPath.replace('/index.mdx', '')
      }

      console.error(`Compiling ${mdxPath}...`)
      let fullPath = path.join(rootPath, mdxPath)

      const parts = mdxPath.split('/')
      const slug = parts.slice(1).join('/').replace('.mdx', '')

      let mdxSource = ''
      let files = {}
      const exists = fs.existsSync(fullPath)
      if (exists && (await fsp.lstat(fullPath)).isDirectory()) {
        mdxSource = await fsp.readFile(`${fullPath}/index.mdx`, 'utf8')
        const mdxFiles = (await fsp.readdir(fullPath)).filter(
          filename => filename !== 'index.mdx',
        )
        const results = await Promise.all(
          mdxFiles.map(async filename =>
            fsp.readFile(`${fullPath}/${filename}`, 'utf8'),
          ),
        )
        files = Object.fromEntries(
          results.map((content, i) => [`./${mdxFiles[i]}`, content]),
        )
      } else {
        if (!fullPath.endsWith('.mdx')) fullPath += '.mdx'
        // verify file exists
        if (!fs.existsSync(fullPath)) continue
        mdxSource = await fsp.readFile(fullPath, 'utf8')
      }
      const cwd = Object.keys(files).length
        ? path.join(rootPath, mdxPath)
        : undefined
      const { frontmatter, code } = await bundleMDX({
        source: mdxSource,
        files,
        // set cwd if mdx has file imports
        cwd,
        xdmOptions(options) {
          options.remarkPlugins = [
            ...(options.remarkPlugins ?? []),
            [remarkCodeHike, { theme }],
          ]
          // options.rehypePlugins = [
          //   ...(options.rehypePlugins ?? []),
          //   rehypeHighlight,
          // ]
          return options
        },
      })
      const Component = getMDXComponent(code)
      const html = renderToString(React.createElement(Component))

      let seriesRoot = undefined
      let series = undefined
      console.error(`${mdxPath} ${parts.length}`)
      if (parts.length > 3) {
        // get series root (strip content/ from path)
        seriesRoot = path.join(parts.slice(1, 3).join('/'))
        console.error('Series root:', seriesRoot)
        // series index
        if (parts[parts.length - 1] === 'series.mdx') {
          console.error('Series index')

          // this is a series so save in map
          frontmatter.postInfo = {} // reset post info (will be populated by posts)
          seriesMap.set(seriesRoot, { slug, frontmatter, html, code, files })
          Array.from(frontmatter['posts']).forEach(post => {
            let postPath = path.join('content', seriesRoot, post)
            const fullPath = path.join(rootPath, postPath)
            const exists = fs.existsSync(fullPath)
            if (!exists) {
              postPath += '.mdx'
            }
            if (!mdxPaths.includes(postPath)) {
              mdxPaths.push(postPath)
            }
          })
          // series will be posted after all posts are processed
          continue
        }
        // this is a blog post in a series
        series = seriesMap.get(seriesRoot)
        if (!series) {
          console.error(
            'fetching series',
            `${process.env.API_URL}/get-content/${seriesRoot}/series`,
          )

          // series not in local map, so get it from the API
          const response = await fetch(
            `${process.env.API_URL}/get-content/${seriesRoot}/series`,
          )
          if (response.ok) {
            console.error('got series', series)
            series = await response.json()
            seriesMap.set(seriesRoot, series)

            // once a new series is fetched, re-process all posts in the series
            Array.from(series.frontmatter.posts).forEach(post => {
              let postPath = path.join('content', seriesRoot, post)
              const fullPath = path.join(rootPath, postPath)
              const exists = fs.existsSync(fullPath)
              if (!exists) {
                postPath += '.mdx'
              }
              if (!mdxPaths.includes(postPath)) {
                mdxPaths.push(postPath)
              }
            })
          } else {
            console.error('ERROR', response.statusText)
            // series not found, so reprocess this file after the series is created
            continue
          }
        }
        // get last segment of slug
        const postSlug = parts[parts.length - 1].replace('.mdx', '')
        console.error(`updating series ${seriesRoot} for post ${postSlug}`)
        // add post info to series for series index
        series.frontmatter.postInfo = {
          ...series.frontmatter.postInfo,
          ...{
            [postSlug]: {
              title: frontmatter.title,
              date: frontmatter.date,
            },
          },
        }
        console.error(JSON.stringify(series, null, 2))
      }

      const [response, hash] = await postContent(
        slug,
        frontmatter,
        html,
        code,
        files,
        series,
      )
      if (!response.ok) {
        const body = await response.text()
        results[originalPath] = {
          status: response.status,
          statusText: response.statusText,
          body,
        }
        hasError = true
      }
      results[originalPath] = {
        status: response.status,
        statusText: response.statusText,
        slug,
        hash,
      }
    } finally {
      // remove file from list
      processed[originalPath] = true
      mdxPaths.splice(0, 1)
    }
  }
  // update any series data
  for (let [seriesRoot, series] of seriesMap.entries()) {
    console.error('posting series', seriesRoot, series)
    const [response, hash] = await postContent(
      series.slug,
      series.frontmatter,
      series.html,
      series.code,
      series.files,
      undefined,
    )
    if (!response.ok) {
      const body = await response.text()
      results[`content/${seriesRoot}/series.mdx`] = {
        status: response.status,
        statusText: response.statusText,
        body,
      }
      hasError = true
    }
    results[`content/${seriesRoot}/series.mdx`] = {
      status: response.status,
      statusText: response.statusText,
      slug: series.slug,
      hash,
    }
  }

  if (options.json) {
    console.log(JSON.stringify(results, null, 2))
  }
  process.exit(hasError ? 1 : 0)
})()

async function postContent(slug, frontmatter, html, code, files, series) {
  const hash = crypto
    .createHash('sha256')
    .update(
      `${JSON.stringify(frontmatter)}${JSON.stringify(series) ?? ''}${code}`,
    )
    .digest('hex')

  const response = await fetch(`${process.env.API_URL}/post-content`, {
    method: 'post',
    body: JSON.stringify({
      slug,
      hash,
      frontmatter,
      series: series
        ? {
            slug: series.slug,
            title: series.frontmatter.title,
            sequence: getSeriesPostNumber(series.frontmatter.posts, slug),
            length: series.frontmatter.posts.length,
          }
        : undefined,
      html,
      code: files && Object.keys(files).length > 0 ? code : undefined,
    }),
    headers: {
      authorization: `Bearer ${process.env.POST_API_KEY}`,
    },
  })
  return [response, hash]
}

function getSeriesPostNumber(posts, slug) {
  // get last segment of slug
  const parts = slug.split('/')
  const last = parts[parts.length - 1]
  return posts.indexOf(last) + 1
}
