import {
  HeadersFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix'
import { getMDXComponent } from '~/utils/mdx.client'
import customCodeCss from '~/styles/custom-code.css'
import { siteTitle } from '~/utils/constants'

declare var CONTENT: KVNamespace

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/github-dark.min.css',
  },
  {
    rel: 'stylesheet',
    href: customCodeCss,
  },
]

type BlogContentType = {
  frontmatter: { [key: string]: any }
  html: string
  code?: string
  hash?: string
}

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

export const loader: LoaderFunction = async ({ request, params }) => {
  const slug = params['*']
  if (slug === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const data = await CONTENT.get(`blog/${slug}`, 'json')
  if (data === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const { frontmatter, html, code, hash } = data as BlogContentType

  const etag = request.headers.get('If-None-Match')
  if (etag === hash) {
    return new Response('Not Modified', { status: 304 })
  }

  return json(
    {
      slug,
      frontmatter,
      html,
      code,
    },
    {
      headers: {
        // use weak etag because Cloudflare only supports
        // srong etag on Enterprise plans :(
        ETag: `W/"${hash}"`,
        'x-remix': 'test',
      },
    },
  )
}
export let meta: MetaFunction = ({ data }) => {
  let title = siteTitle
  let description = ''
  if (data) {
    title = `${data.frontmatter.title} - ${siteTitle}`
    description = data.frontmatter.description
  }
  return {
    title,
    description,
  }
}
export default function Post() {
  const { html, frontmatter, code } = useLoaderData()
  let Component = null
  if (typeof window !== 'undefined' && code) {
    Component = getMDXComponent(code)
  }
  return (
    <>
      {Component ? (
        <main className="prose dark:prose-invert prose-slate">
          <Component />
        </main>
      ) : (
        <main
          className="prose dark:prose-invert prose-slate"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  )
}
