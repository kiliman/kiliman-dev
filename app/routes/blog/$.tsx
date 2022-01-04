import {
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
}
export const loader: LoaderFunction = async ({ params }) => {
  const slug = params['*']
  if (slug === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const data = await CONTENT.get(`blog/${slug}`, 'json')
  if (data === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const { frontmatter, html, code } = data as BlogContentType
  return json({
    slug,
    frontmatter,
    html,
    code,
  })
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
