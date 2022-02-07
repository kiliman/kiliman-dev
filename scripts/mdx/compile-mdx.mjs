import { config } from 'dotenv'
import * as fs from 'fs'
import * as fsp from 'fs/promises'
import * as path from 'path'
import * as crypto from 'crypto'
import fetch from 'node-fetch'
import * as React from 'react'
import { renderToString } from 'react-dom/server.js'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { remarkMdxCodeMeta } from 'remark-mdx-code-meta'
import rehypeHighlight from 'rehype-highlight'
import { Command } from 'commander/esm.mjs'
;(async function () {
  config()
  const program = new Command()
  program
    .option('-R, --root <path>', 'Root path (content is relative to root')
    .option('-f, --file [files...]', 'Files to compile')
    .option('-j, --json', 'Output JSON')

  program.parse(process.argv)
  const options = program.opts()
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
    try {
      if (processed[mdxPath]) continue

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
          // options.remarkPlugins = [
          //   ...(options.remarkPlugins ?? []),
          //   remarkMdxCodeMeta,
          // ]
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            rehypeHighlight,
          ]
          return options
        },
      })
      const Component = getMDXComponent(code)
      const html = renderToString(React.createElement(Component))
      const hasComponents = Object.keys(files).length > 0

      let seriesRoot = undefined
      let series = undefined
      if (parts.length > 3) {
        // get series root (strip content/ from path)
        seriesRoot = path.join(parts.slice(1, 3).join('/'))
      }
      if (parts[parts.length - 1] === 'series.mdx') {
        // this is a series so get frontmatter
        frontmatter.slug = slug
        seriesMap.set(seriesRoot, frontmatter)
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
      } else if (seriesRoot) {
        // this is a blog post in a series
        series = seriesMap.get(seriesRoot)
        if (!series) {
          // series not in local map, so get it from the API
          const response = await fetch(
            `${process.env.API_URL}/get-content/${seriesRoot}/series`,
          )
          if (response.ok) {
            series = await response.json()
            seriesMap.set(seriesRoot, series)
          } else {
            // series not found, so reprocess this file after the series is created
            continue
          }
        }
      }

      const hash = crypto
        .createHash('sha256')
        .update(
          `${JSON.stringify(frontmatter)}${
            JSON.stringify(series) ?? ''
          }${code}`,
        )
        .digest('hex')

      console.error('series', JSON.stringify(series, null, 2))
      const response = await fetch(`${process.env.API_URL}/post-content`, {
        method: 'post',
        body: JSON.stringify({
          slug,
          hash,
          frontmatter,
          series: series
            ? {
                slug: series.slug,
                title: series.title,
                sequence: getSeriesPostNumber(series.posts, slug),
                length: series.posts.length,
              }
            : undefined,
          html,
          code: hasComponents ? code : undefined,
        }),
        headers: {
          authorization: `Bearer ${process.env.POST_API_KEY}`,
        },
      })
      if (!response.ok) {
        const body = await response.text()
        results[mdxPath] = {
          status: response.status,
          statusText: response.statusText,
          body,
        }
        hasError = true
      }
      results[mdxPath] = {
        status: response.status,
        statusText: response.statusText,
        slug,
        hash,
      }
    } finally {
      // remove file from list
      processed[mdxPath] = true
      mdxPaths.splice(0, 1)
    }
  }
  if (options.json) {
    console.log(JSON.stringify(results, null, 2))
  }
  process.exit(hasError ? 1 : 0)
})()

function getSeriesPostNumber(posts, slug) {
  // get last segment of slug
  const parts = slug.split('/')
  const last = parts[parts.length - 1]
  return posts.indexOf(last) + 1
}
