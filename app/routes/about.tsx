import {
  HeadersFunction,
  json,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix'
import { getMDXComponent } from '~/utils/mdx.client'
import { siteTitle } from '~/utils/constants'
import HeroImage from '~/components/HeroImage'
import Tag from '~/components/Tag'

declare var CONTENT: KVNamespace

type ContentType = {
  slug: string
  series?: SeriesType
  frontmatter: FrontmatterType
  html: string
  code: string
  hash: string
}
type SeriesType = {
  title: string
  description?: string
  frontmatter: FrontmatterType
}
type FrontmatterType = {
  [key: string]: any
}

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

export const loader: LoaderFunction = async ({ request }) => {
  const data = await CONTENT.get(`pages/about`, 'json')
  if (data === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const { frontmatter, html, code, hash } = data as ContentType
  const etag = request.headers.get('If-None-Match')
  if (etag === hash) {
    return new Response('Not Modified', { status: 304 })
  }

  return json(
    {
      frontmatter,
      html,
      code,
    },
    {
      headers: {
        etag: `"${hash}"`,
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
  const data = useLoaderData()
  const { html, slug, frontmatter, code, seriesIndex, date } = data
  let Component = null
  if (typeof window !== 'undefined' && code) {
    Component = getMDXComponent(code)
  }
  return (
    <>
      <HeroImage frontmatter={frontmatter} />
      <div className="m-auto max-w-prose">
        <h1 className="mb-4 text-3xl font-bold text-center">
          {frontmatter.title}
        </h1>
        <div className="flex justify-end mb-6 items-bottom">
          {frontmatter.tags && (
            <div className="flex items-center gap-2">
              {frontmatter.tags.map((tag: string) => (
                <Link key={tag} to={`/tags/${tag}`}>
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </div>
          )}
        </div>
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
      </div>
    </>
  )
}
