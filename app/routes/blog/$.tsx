import { CH } from '@code-hike/mdx/components'
import { CalendarIcon } from '@heroicons/react/24/outline'
import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect } from 'react'
import { hydrate } from 'react-dom'
import theme from 'shiki/themes/material-default.json'
import HeroImage from '~/components/HeroImage'
import Tag from '~/components/Tag'
import { siteTitle } from '~/utils/constants'
import { getMDXComponent } from '~/utils/mdx.client'

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
  let routeSlug = params['*']
  if (routeSlug === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const data = (await CONTENT.get(`blog/${routeSlug}`, 'json')) as ContentType
  if (!data) {
    throw new Response('Not Found', { status: 404 })
  }
  const { commit }: any = (await CONTENT.get('$$deploy-sha', 'json')) ?? {
    commit: {},
  }
  const commitSha = commit.sha ?? '0'
  const { slug, frontmatter, html, code, hash } = data

  // weak hash should include commit sha since changes in code
  // could result in changes to the content page
  const weakHash = generateWeakHash(commitSha, hash)
  const etag = request.headers.get('If-None-Match')
  if (etag === weakHash) {
    return new Response(null, { status: 304 })
  }

  // get series if post is part of a series
  let series
  if (data.series) {
    series = await CONTENT.get(data.series.slug, 'json')
  }

  const language =
    request.headers.get('Accept-Language')?.split(',')?.[0] ?? 'en-US'

  return json(
    {
      slug,
      frontmatter,
      html,
      code,
      series,
      date:
        frontmatter.published && frontmatter.published !== 'draft'
          ? new Intl.DateTimeFormat(language, {
              timeZone: 'UTC',
              dateStyle: 'long',
            }).format(new Date(frontmatter.published))
          : 'Draft',
    },
    {
      headers: [
        // use weak etag because Cloudflare only supports
        // strong etag on Enterprise plans :(
        ['etag', weakHash],
      ],
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
  const { html, slug, frontmatter, code, series, date } = data
  let Component: any = null
  if (typeof document !== 'undefined' && code) {
    Component = getMDXComponent(code)
  }
  useEffect(() => {
    if (Component) {
      hydrate(
        <Component theme={theme} components={{ CH }} />,
        document.getElementById('post') as HTMLElement,
      )
    }
  }, [Component])
  return (
    <>
      <HeroImage frontmatter={frontmatter} />
      <div className="m-auto max-w-none">
        <h1 className="mb-4 text-3xl font-bold text-center">
          {frontmatter?.title}
        </h1>
        <div className="flex justify-between mb-6 items-bottom">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-slate-400" />
            <div className="text-slate-400">{date}</div>
          </div>
          {frontmatter?.tags && (
            <div className="flex items-center gap-2">
              {frontmatter.tags.map((tag: string) => (
                <Link key={tag} to={`/blog/tags/${tag}`}>
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </div>
          )}
        </div>
        {series && !slug.endsWith('/series') && (
          <SeriesIndex series={series} slug={slug} />
        )}
        <div
          id="post"
          className="prose dark:prose-invert prose-slate max-w-none"
          suppressHydrationWarning={true}
          dangerouslySetInnerHTML={{
            __html: html, //.replace(/opacity:0/g, 'opacity:1'),
          }}
        />
        {/* {Component ? (
          <main className="prose dark:prose-invert prose-slate">
            <Component theme={theme} components={{ CH }} />
          </main>
        ) : (
          <main
            className="prose dark:prose-invert prose-slate"
            dangerouslySetInnerHTML={{
              __html: html.replace(/opacity:0/g, 'opacity:1'),
            }}
          />
        )} */}
        {slug?.endsWith('/series') && <SeriesIndex series={data} slug={slug} />}
      </div>
    </>
  )
}

function SeriesIndex({ series, slug }: any) {
  const { frontmatter } = series
  const seriesRoot = series.slug.replace(/\/series$/, '')
  const parts = slug.split('/')
  const last = parts[parts.length - 1]
  let index = -1
  let start = 0
  let end = frontmatter.posts.length - 1
  let postSlug: string | undefined = undefined
  if (last !== series) {
    postSlug = last
    index = getSeriesPostNumber(frontmatter.posts, postSlug!)
    start = Math.max(index - 2, 0)
    end = Math.min(index + 3, frontmatter.posts.length - 1)
  }
  return (
    <div className="w-full py-3 m-auto my-6 rounded-lg sm:w-3/4 bg-slate-700 text-slate-100">
      <Link
        to={`/${series.slug}`}
        className="block px-4 mb-1 text-lg font-medium"
      >
        {frontmatter.title} ({frontmatter.posts.length} Part Series)
      </Link>
      <ul>
        {/* {start > 0 && (
          <li
            className={clsx(
              'px-4 py-1.5 hover:bg-slate-600',
              postSlug && postSlug === slug && 'bg-slate-800',
            )}
          >
            Posts #1 &ndash; {start + 1}
          </li>
        )} */}
        {frontmatter.posts.map((slug: any, index: number) => (
          <li
            key={slug}
            className={clsx(
              'px-4 py-1.5 hover:bg-slate-600',
              postSlug && postSlug === slug && 'bg-slate-800',
            )}
          >
            <Link
              to={`/${seriesRoot}/${slug}`}
              className="flex items-baseline gap-2"
            >
              <div className="flex items-center justify-center w-6 h-6 p-2 text-sm rounded-full bg-slate-900">
                {index + 1}
              </div>
              <div>{frontmatter.postInfo[slug].title}</div>
            </Link>
          </li>
        ))}
        {/* {frontmatter.posts.length - end > 0 && (
          <li
            className={clsx(
              'px-4 py-1.5 hover:bg-slate-600',
              postSlug && postSlug === slug && 'bg-slate-800',
            )}
          >
            Posts #{end} &ndash; {frontmatter.posts.length}
          </li>
        )} */}
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

function getSeriesPostNumber(posts: string[], postSlug: string) {
  return posts.indexOf(postSlug) + 1
}

function generateWeakHash(commitSha: string, hash: string) {
  return `W/${commitSha.substring(0, 20)}-${hash.substring(0, 20)}`
}
