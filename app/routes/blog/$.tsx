import {
  HeadersFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  Link,
} from 'remix'
import { getMDXComponent } from '~/utils/mdx.client'
import customCodeCss from '~/styles/custom-code.css'
import { siteTitle } from '~/utils/constants'
import { useEffect } from 'react'
import clsx from 'clsx'
import { CalendarIcon } from '@heroicons/react/outline'
import HeroImage from '~/components/HeroImage'
import Tag from '~/components/Tag'

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

type ContentType = {
  slug: string
  series?: SeriesType
  frontmatter: FrontmatterType
  html: string
  code: string
  hash: string
}
type SeriesType = {
  slug: string
  title: string
  description?: string
  frontmatter: FrontmatterType
}
type FrontmatterType = {
  [key: string]: any
}

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

export const loader: LoaderFunction = async ({ request, params }) => {
  let slug = params['*']
  if (slug === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const data = (await CONTENT.get(`blog/${slug}`, 'json')) as ContentType
  if (data === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const { commit }: any = (await CONTENT.get('$$deploy-sha', 'json')) ?? {
    commit: {},
  }
  const commitSha = commit.sha ?? '0'
  const { frontmatter, series, html, code, hash } = data

  // weak hash should include commit sha since changes in code
  // could result in changes to the content page
  const weakHash = generateWeakHash(commitSha, hash)
  const etag = request.headers.get('If-None-Match')
  if (etag === weakHash) {
    return new Response(null, { status: 304 })
  }
  let seriesIndex: any = undefined
  if (slug.endsWith('/series')) {
    seriesIndex = {
      slug: data.slug,
      title: frontmatter.title,
      posts: await getPostsForSeries(frontmatter),
    }
  } else if (series) {
    seriesIndex = {
      slug: series.slug,
      title: series.title,
      posts: await getPostsForSeries(series),
    }
  }

  const language =
    request.headers.get('Accept-Language')?.split(',')?.[0] ?? 'en-US'

  return json(
    {
      slug,
      frontmatter,
      html,
      code,
      seriesIndex,
      date: frontmatter.published
        ? new Intl.DateTimeFormat(language, {
            timeZone: 'UTC',
            dateStyle: 'long',
          }).format(new Date(frontmatter.published))
        : 'Draft',
    },
    {
      headers: {
        // use weak etag because Cloudflare only supports
        // srong etag on Enterprise plans :(
        ETag: weakHash,
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
        <div className="flex justify-between mb-6 items-bottom">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-slate-200" />
            <div>{date}</div>
          </div>
          {frontmatter.tags && (
            <div className="flex items-center gap-2">
              {frontmatter.tags.map((tag: string) => (
                <Link key={tag} to={`/blog/tags/${tag}`}>
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </div>
          )}
        </div>
        {seriesIndex && !slug.endsWith('/series') && (
          <SeriesIndex seriesIndex={seriesIndex} slug={slug} />
        )}

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
        {seriesIndex && slug.endsWith('/series') && (
          <SeriesIndex seriesIndex={seriesIndex} slug={slug} />
        )}
      </div>
    </>
  )
}

function SeriesIndex({ seriesIndex, postSlug }: any) {
  const { slug, title, posts } = seriesIndex
  let start = 0
  let end = seriesIndex.posts.length - 1
  if (!slug.endsWith('/series')) {
    const index = getSeriesPostNumber(posts, postSlug)
    start = Math.max(index - 2, 0)
    end = Math.min(index + 3, posts.length - 1)
  }
  return (
    <div className="w-full py-3 m-auto mt-6 rounded-lg sm:w-3/4 bg-slate-700 text-slate-100">
      <Link to={`/${slug}`} className="block px-4 mb-1 text-lg font-medium">
        {title} ({posts.length} Part Series)
      </Link>
      <ul>
        {posts.map(({ slug, frontmatter }: any, index: number) => (
          <li key={slug} className="px-4 py-1.5 hover:bg-slate-600">
            <Link to={`/${slug}`} className="flex items-baseline gap-2">
              <div className="flex items-center justify-center w-6 h-6 p-2 text-sm rounded-full bg-slate-900">
                {index + 1}
              </div>
              <div>{frontmatter.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function getPostsForSeries(series: any) {
  const seriesRoot = series.slug.replace(/\/series$/, '')
  return Promise.all(
    series.posts.map(async (post: string) => {
      const data = await CONTENT.get(`${seriesRoot}/${post}`, 'json')
      if (!data) {
        throw new Error(`Could not find post ${post} in series ${seriesRoot}`)
      }
      const { slug, frontmatter } = data as any
      return { slug, frontmatter }
    }),
  )
}

function getSeriesPostNumber(posts: string[], slug: string) {
  // get last segment of slug
  const parts = slug.split('/')
  const last = parts[parts.length - 1]
  return posts.indexOf(last) + 1
}

function generateWeakHash(commitSha: string, hash: string) {
  return `W/${commitSha.substring(0, 20)}-${hash.substring(0, 20)}`
}
