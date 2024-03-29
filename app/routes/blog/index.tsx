import {
  CalendarIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Link } from '~/components/Link'
import Logo from '~/components/Logo'
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
        <ul className="mt-6 flex flex-col w-full gap-y-4 sm:gap-y-6 gap-x-4">
          {posts.map((post: any) => (
            <ListItem key={post.slug}>
              <div className="flex">
                <Link to={`/${post.slug}`}>
                  <div className="mt-1.5">
                    {post.image ? (
                      <img
                        className="min-w-[64px] min-h-[64px] h-16 w-16 rounded mr-4"
                        src={post.image.url.replace(
                          /public$/,
                          'width=256,height=256,fit=crop,gravity=0.5x0.5',
                        )}
                        alt={post.title}
                      />
                    ) : (
                      <Logo className="min-w-[64px] min-h-[64px] h-16 w-16 rounded mr-4" />
                    )}
                  </div>
                </Link>

                <div>
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
                  {post.series && (
                    <div className="mt-2 flex items-center gap-2">
                      <DocumentDuplicateIcon className="w-4 h-4 text-slate-400" />
                      <div className="text-sm text-slate-200">
                        <Link
                          size="text-sm"
                          color="text-slate-300"
                          to={`/${post.series.slug}`}
                        >
                          Series{' '}
                          <span className="inline-block underline decoration-dashed hover:decoration-solid">
                            {post.series.title}
                          </span>{' '}
                          (Post #{post.series.sequence} of {post.series.count})
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="basis-1/3">
        <h1 className="text-3xl font-bold">Blog Series</h1>
        <ul className="flex flex-col mt-6 gap-y-4 sm:gap-y-6 gap-x-4">
          {series.map(({ slug, ...frontmatter }: any) => (
            <ListItem key={slug}>
              <div className="flex">
                <Link to={`/${slug}`}>
                  <div className="mt-1.5">
                    {frontmatter.image ? (
                      <img
                        className="min-w-[64px] min-h-[64px] h-16 w-16 rounded mr-4"
                        src={frontmatter.image?.url.replace(
                          /public$/,
                          'width=256,height=256,fit=crop,gravity=0.5x0.5',
                        )}
                        alt={frontmatter.title}
                      />
                    ) : (
                      <Logo className="min-w-[64px] min-h-[64px] h-16 w-16 rounded mr-4" />
                    )}
                  </div>
                </Link>
                <div>
                  <Link to={`/${slug}`}>
                    <div>{frontmatter.title}</div>
                  </Link>
                  <p className="mt-1 text-sm text-slate-300 line-clamp-2">
                    {frontmatter.description}
                  </p>
                </div>
              </div>
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

function getSeriesPostNumber(posts: string[], slug: string) {
  // get last segment of slug
  const parts = slug.split('/')
  const last = parts[parts.length - 1]
  return posts.indexOf(last) + 1
}
