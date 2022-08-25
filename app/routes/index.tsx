import { CalendarIcon } from '@heroicons/react/outline'
import {
  HeadersFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import { Link as RemixLink, useLoaderData } from '@remix-run/react'
import Logo from '~/components/Logo'
import { siteTitle } from '~/utils/constants'
declare var CONTENT: KVNamespace

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

export const loader: LoaderFunction = async () => {
  const posts = (await CONTENT.get('blog/$index', 'json')) as any[]
  return json(
    { posts: posts.slice(0, 6) },
    {
      headers: {
        'cache-control': 'max-age=300',
      },
    },
  )
}
export const meta: MetaFunction = () => ({
  title: `${siteTitle}`,
})

export default function Index() {
  const { posts } = useLoaderData()
  return (
    <div className="container flex flex-col gap-4 m-auto">
      <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
      <ul className="mt-6 flex flex-col sm:flex-row flex-wrap w-full gap-y-4 sm:gap-y-6 gap-x-4">
        {posts.map((post: any) => (
          <li
            key={post.slug}
            className="mb-4 flex-1 sm:w-[45%] sm:min-w-[45%] md:w-[30%] md:min-w-[30%]"
          >
            <div className="flex flex-col border border-slate-800 rounded overflow-hidden">
              <Link to={`/${post.slug}`}>
                {post.image ? (
                  <img
                    className="min-h-[192px] h-48 w-full object-cover"
                    src={post.image.url.replace(
                      /public$/,
                      'width=512,height=256,fit=cover,gravity=0.5x0.5',
                    )}
                    alt={post.title}
                  />
                ) : (
                  <div className="h-48 w-full bg-slate-800 flex items-center justify-center">
                    <Logo className="w-48 rounded mr-4" />
                  </div>
                )}
              </Link>
              <div className="p-4">
                <Link to={`/${post.slug}`}>
                  <div>{post.title}</div>
                </Link>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-slate-400" />
                  <div className="text-sm text-slate-400">
                    {post.published && post.published !== 'draft'
                      ? new Intl.DateTimeFormat('en-us', {
                          timeZone: 'UTC',
                          dateStyle: 'long',
                        }).format(new Date(post.published))
                      : 'Draft'}
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-300 line-clamp-2">
                  {post.description}
                </p>
                {/* {post.series && (
                    <p className="mt-2">
                      Series{' '}
                      <Link to={`/${post.series.slug}`}>
                        {post.series.title}
                      </Link>{' '}
                      (Post #{post.series.sequence} of {post.series.count})
                    </p>
                  )} */}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Link className="underline" to="/blog/">
        More blog posts
      </Link>
    </div>
  )
}

function ListItem({ children, className }: any) {
  return <li className={`mb-4 ${className}`}>{children}</li>
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
