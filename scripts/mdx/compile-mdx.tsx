import { remarkCodeHike } from '@code-hike/mdx'
import { CH } from '@code-hike/mdx/components'
import { Command } from 'commander'
import * as crypto from 'crypto'
import { config } from 'dotenv'
import * as fs from 'fs'
import * as fsp from 'fs/promises'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import fetch, { type Response } from 'node-fetch'
import * as path from 'path'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import theme from 'shiki/themes/material-default.json'
let v = React.version
type Frontmatter = { [key: string]: any }

let rootPath: string
let hasError = false
let mdxPaths: string[]
const results: Record<string, any> = {}
const processed: Record<string, boolean> = {}
const seriesMap = new Map()
const index: Record<string, any> = {}

let API_URL: string = ''
let API_KEY: string = ''

;(async function () {
  config()
  initEsbuild()
  const program = new Command()
  program
    .option('-R, --root <path>', 'Root path (content is relative to root')
    .option('-f, --file [files...]', 'Files to compile')
    .option('-j, --json', 'Output JSON')
    .option('--regen', 'Regenerate Content')
    .option('--api <url>', 'API URL')
    .option('--key <key>', 'API Key')

  program.parse(process.argv)
  const options = program.opts()

  API_URL = options.api ?? process.env.API_URL
  API_KEY = options.key ?? process.env.API_KEY

  console.error('Compiling content')
  if (!API_URL) {
    console.error('missing API_URL')
    process.exit(1)
  }

  rootPath = options.root ?? '.'
  mdxPaths = options.file ?? []

  if (options.regen) {
    mdxPaths = getAllContentFiles(path.join(rootPath, 'content'))
  }
  console.log('compiling', mdxPaths)
  // process files until empty
  while (mdxPaths.length) {
    let mdxPath = mdxPaths[0]
    if (mdxPath.startsWith('/')) {
      mdxPath = mdxPath.substring(rootPath.length + 1)
    }
    await processMdx(mdxPath, { postContentToServer: true, outputLog: true })
  }
  // update any series data
  await updateSeries()
  // generate index and post to server
  await generateIndex()

  if (options.json) {
    console.log(JSON.stringify(results, null, 2))
  }
  process.exit(hasError ? 1 : 0)
})()

async function processMdx(
  mdxPath: string,
  options: { postContentToServer: boolean; outputLog: boolean },
) {
  let originalPath = mdxPath
  try {
    if (processed[originalPath]) return

    // remove index.mdx from path
    if (mdxPath.endsWith('/index.mdx')) {
      mdxPath = mdxPath.replace('/index.mdx', '')
    }
    if (!mdxPath) return

    if (options.outputLog) {
      console.error(`Compiling ${mdxPath}...`)
    }

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
      if (!fs.existsSync(fullPath)) return
      mdxSource = await fsp.readFile(fullPath, 'utf8')
    }
    const cwd = Object.keys(files).length
      ? path.resolve(process.cwd(), path.join(rootPath, mdxPath))
      : undefined

    let { frontmatter, code } = await bundleMDX({
      source: mdxSource,
      files,
      // set cwd if mdx has file imports
      cwd,
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          [
            remarkCodeHike,
            {
              showCopyButton: true,
              theme,
              autoImport: false,
              staticMediaQuery: 'not screen, (max-width: 1024px)',
            },
          ],
        ]
        return options
      },
    })

    const Component = getMDXComponent(code)
    // strip theme from code
    code = code.replace(/theme:(.*)autoImport/g, 'theme:{},autoImport')
    const html = renderToString(<Component theme={theme} components={{ CH }} />)

    let seriesRoot: string
    let series = undefined
    if (parts.length > 3) {
      // get series root (strip content/ from path)
      seriesRoot = path.join(parts.slice(1, 3).join('/'))
      // series index
      if (parts[parts.length - 1] === 'series.mdx') {
        // this is a series so save in map
        seriesMap.set(seriesRoot, { slug, frontmatter, html, code, files })
        frontmatter.postInfo = {} // reset post info (will be populated by posts)
        Array.from(frontmatter.posts as string[]).forEach(post => {
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
        mdxPaths.splice(0, 1)
        mdxPaths.push(mdxPath)
        return
      }
      // this is a blog post in a series
      series = seriesMap.get(seriesRoot)
      if (!series) {
        // series not in local map, so get it from the API
        const url = `${API_URL}/get-content/${seriesRoot}/series`
        const response = await fetch(url)
        if (response.ok) {
          series = await response.json()
          if (!series) {
            seriesMap.set(seriesRoot, 'pending')
            return
          }
          seriesMap.set(seriesRoot, series)
          // once a new series is fetched, re-process all posts in the series
          Array.from(series.frontmatter.posts as string[]).forEach(post => {
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

          return
        }
      }
      if (series === 'pending') return
      // update post frontmatter with series info
      const seriesPosts = series.frontmatter.posts.map(
        (post: string) => `${seriesRoot}/${post}`,
      )
      frontmatter.series = {
        slug: series.slug,
        title: series.frontmatter.title,
        description: series.frontmatter.description,
        sequence: seriesPosts.indexOf(slug) + 1,
        count: seriesPosts.length,
      }

      // get last segment of slug
      const postSlug = parts[parts.length - 1].replace('.mdx', '')
      // add post info to series for series index
      if (frontmatter.published && frontmatter.published !== 'draft') {
        series.frontmatter.postInfo = {
          ...series.frontmatter.postInfo,
          ...{
            [postSlug]: {
              title: frontmatter.title,
              published: frontmatter.published,
            },
          },
        }
      }
    }
    // update index
    index[slug] = {
      slug,
      ...frontmatter,
    }

    if (options.postContentToServer) {
      const [response, hash] = await postContent(
        slug,
        frontmatter,
        html,
        code,
        files,
        series,
      )
      if (response.status !== 200) {
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
    }
  } finally {
  }
  // remove file from list
  processed[originalPath] = true
  mdxPaths.splice(0, 1)
}

async function postContent(
  slug: string,
  frontmatter: Frontmatter,
  html: string,
  code: string,
  files: Record<string, string> | undefined,
  series: any,
): Promise<[Response, string]> {
  console.log('postContent', slug)
  const hash = crypto
    .createHash('sha256')
    .update(
      `${JSON.stringify(frontmatter)}${JSON.stringify(series) ?? ''}${code}`,
    )
    .digest('hex')

  const hasCode =
    (files && Object.keys(files).length > 0) || /<code/g.test(html)
  const response = await fetch(`${API_URL}/post-content`, {
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
      code: hasCode ? code : undefined,
    }),
    headers: {
      authorization: `Bearer ${API_KEY}`,
    },
  })
  return [response, hash]
}
async function updateSeries() {
  for (let [seriesRoot, series] of seriesMap.entries()) {
    console.error('series', series.slug, series.frontmatter)
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
}

function getSeriesPostNumber(posts: any[], slug: string) {
  // get last segment of slug
  const parts = slug.split('/')
  const last = parts[parts.length - 1]
  return posts.indexOf(last) + 1
}

function getAllContentFiles(parentDir: string) {
  const files: string[] = []
  const walk = (dir: string) => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        walk(filePath)
      } else {
        if (file.endsWith('.mdx') && !file.endsWith('series.mdx')) {
          files.push(filePath)
        }
      }
    })
  }
  walk(parentDir)
  return files
}

async function generateIndex() {
  console.error('Generating index...')
  mdxPaths = getAllContentFiles(path.join(rootPath, 'content/blog'))
  while (mdxPaths.length) {
    let mdxPath = mdxPaths[0].substring(rootPath.length + 1)
    // process any files that are not yet processed but don't post to server
    await processMdx(mdxPath, { postContentToServer: true, outputLog: true })
  }
  // sort index by published date
  const posts = Object.values(index).filter(
    (frontmatter: Frontmatter) =>
      frontmatter.published && frontmatter.published !== 'draft',
  )

  posts.sort((a: Frontmatter, b: Frontmatter) => {
    const aDate = new Date(a.updated ?? a.published)
    const bDate = new Date(b.updated ?? b.published)
    const diff = bDate.getTime() - aDate.getTime()
    // sort published date descending then by title ascending
    return diff === 0 ? (a.title < b.title ? -1 : 1) : diff
  })

  const series = Array.from(seriesMap.values()).map((series: any) => ({
    slug: series.slug,
    title: series.frontmatter.title,
    description: series.frontmatter.description,
    published: series.frontmatter.published,
    count: series.frontmatter.posts.length,
    image: series.frontmatter.image,
    postInfo: series.frontmatter.postInfo,
    // postInfo: Object.fromEntries(
    //   Object.entries(series.frontmatter.postInfo).filter(
    //     ([_, post]: any) => post.published !== 'draft',
    //   ),
    // ),
  }))
  series.sort((a: Frontmatter, b: Frontmatter) => {
    const aDate = new Date(a.updated ?? a.published)
    const bDate = new Date(b.updated ?? b.published)
    const diff = bDate.getTime() - aDate.getTime()
    // sort published date descending then by title ascending
    return diff === 0 ? (a.title < b.title ? -1 : 1) : diff
  })

  console.error('Writing index...')
  const responses = await Promise.all([
    fetch(`${API_URL}/update-index`, {
      method: 'post',
      body: JSON.stringify(posts),
      headers: {
        authorization: `Bearer ${API_KEY}`,
      },
    }),
    fetch(`${API_URL}/update-series`, {
      method: 'post',
      body: JSON.stringify(series),
      headers: {
        authorization: `Bearer ${API_KEY}`,
      },
    }),
  ])
  if (responses.some(r => !r.ok)) {
    hasError = true
  }
}

function initEsbuild() {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe',
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild',
    )
  }
}
