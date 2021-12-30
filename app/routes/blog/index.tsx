import {
  json,
  Link as RemixLink,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix'
import { siteTitle } from '~/utils/constants'
declare var CONTENT: KVNamespace

export const loader: LoaderFunction = async () => {
  const slugs = await CONTENT.list({ prefix: 'blog/' })
  const posts = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      const data = await CONTENT.get(name, 'json')
      const { slug, frontmatter, html } = data as any
      return { slug, frontmatter, html }
    }),
  )
  return json({ posts })
}
export const meta: MetaFunction = () => ({
  title: `Blog - ${siteTitle}`,
})

export default function Index() {
  const { posts } = useLoaderData()
  return (
    <>
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <ul className="mt-6">
        {posts.map(({ slug, frontmatter }: any) => (
          <ListItem key={slug}>
            <Link to={`/${slug}`}>{frontmatter.title}</Link>
            <p className="mt-1 text-sm text-slate-300 line-clamp-2">
              {frontmatter.description}
            </p>
          </ListItem>
        ))}
      </ul>
    </>
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
