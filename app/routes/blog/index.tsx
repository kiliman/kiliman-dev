import {
  HeadersFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import { Link as RemixLink, useLoaderData } from '@remix-run/react'
import { siteTitle } from '~/utils/constants'
declare var CONTENT: KVNamespace

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

export const loader: LoaderFunction = async () => {
  const [posts, series] = await Promise.all([
    CONTENT.get('blog/$index', 'json'),
    CONTENT.get('blog/$series', 'json'),
  ])
  return json(
    { posts, series },
    {
      headers: {
        'cache-control': 'max-age=300',
      },
    },
  )
}
export const meta: MetaFunction = () => ({
  title: `Blog - ${siteTitle}`,
})

export default function Index() {
  const { posts, series } = useLoaderData()
  return (
    <div className="container flex flex-col gap-4 m-auto md:flex-row">
      <div className="basis-2/3">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <ul className="mt-6">
          {posts.map((post: any) => (
            <ListItem key={post.slug}>
              <Link to={`/${post.slug}`}>{post.title}</Link>
              <p className="mt-1 text-sm text-slate-300 line-clamp-2">
                {post.description}
              </p>
              {post.series && (
                <p>
                  Series{' '}
                  <Link to={`/${post.series.slug}`}>{post.series.title}</Link>{' '}
                  (Post #{post.series.sequence} of {post.series.count})
                </p>
              )}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="basis-1/3">
        <h1 className="text-3xl font-bold">Blog Series</h1>
        <ul className="mt-6">
          {series.map(({ slug, ...frontmatter }: any) => (
            <ListItem key={slug}>
              <Link to={`/${slug}`}>{frontmatter.title}</Link>
              <p className="mt-1 text-sm text-slate-300 line-clamp-2">
                {frontmatter.description}
              </p>
            </ListItem>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ListItem({ children }: any) {
  return <li className="mb-4">{children}</li>
}
function Link({ to, children }: any) {
  return (
    <RemixLink to={to} className="text-lg text-white hover:underline">
      {children}
    </RemixLink>
  )
}

function getSeriesPostNumber(posts: string[], slug: string) {
  // get last segment of slug
  const parts = slug.split('/')
  const last = parts[parts.length - 1]
  return posts.indexOf(last) + 1
}
