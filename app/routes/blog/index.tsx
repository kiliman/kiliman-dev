import { Link as RemixLink, MetaFunction } from 'remix'
import { siteTitle } from '~/utils/constants'

export const meta: MetaFunction = () => ({
  title: `Blog - ${siteTitle}`,
})

export default function Index() {
  return (
    <>
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <ul className="mt-6">
        <ListItem>
          <Link to="/blog/hello-world">Hello World</Link>
        </ListItem>
        <ListItem>
          <Link to="/blog/example">Example</Link>
        </ListItem>
      </ul>
    </>
  )
}

function ListItem({ children }: any) {
  return <li className="mb-2">{children}</li>
}
function Link({ to, children }: any) {
  return (
    <RemixLink to={to} className="text-lg text-white hover:underline">
      {children}
    </RemixLink>
  )
}
