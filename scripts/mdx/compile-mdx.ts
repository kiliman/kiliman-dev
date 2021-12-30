import { config } from 'dotenv'
import * as fsp from 'fs/promises'
import * as path from 'path'
import fetch from 'node-fetch'
import * as React from 'react'
import { renderToString } from 'react-dom/server.js'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { remarkMdxCodeMeta } from 'remark-mdx-code-meta'
import rehypeHighlight from 'rehype-highlight'
;(async function () {
  config()
  const [basePath, ...mdxPaths] = process.argv.slice(2)
  if (!process.env.POST_API_URL) {
    console.error('missing POST_API_URL')
    process.exit(1)
  }
  const results = {}
  let hasError = false
  for (let mdxPath of mdxPaths) {
    mdxPath = path.join(basePath, mdxPath)
    const slug = path.basename(mdxPath, '.mdx')
    let mdxSource = ''
    let files = {}
    if ((await fsp.lstat(mdxPath)).isDirectory()) {
      mdxSource = await fsp.readFile(`${mdxPath}/index.mdx`, 'utf8')
      const mdxFiles = (await fsp.readdir(mdxPath)).filter(
        filename => filename !== 'index.mdx',
      )
      const results = await Promise.all(
        mdxFiles.map(async filename =>
          fsp.readFile(`${mdxPath}/${filename}`, 'utf8'),
        ),
      )
      files = Object.fromEntries(
        results.map((content, i) => [`./${mdxFiles[i]}`, content]),
      )
    } else {
      mdxSource = await fsp.readFile(mdxPath, 'utf8')
    }
    const { frontmatter, code } = await bundleMDX({
      source: mdxSource,
      files,
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

    const response = await fetch(process.env.POST_API_URL, {
      method: 'post',
      body: JSON.stringify({
        slug,
        frontmatter,
        html,
        code: hasComponents ? code : undefined,
      }),
      headers: {
        authorization: `Bearer ${process.env.POST_API_KEY}`,
      },
    })
    if (!response.ok) {
      const body = await response.text()
      results[slug] = {
        status: response.status,
        statusText: response.statusText,
        body,
      }
      hasError = true
    }
    results[slug] = { status: response.status, statusText: response.statusText }
  }
  console.error(results)
  process.exit(hasError ? 1 : 0)
})()
