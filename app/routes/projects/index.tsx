import { Link as RemixLink, MetaFunction } from 'remix'
import { siteTitle } from '~/utils/constants'

export const meta: MetaFunction = () => ({
  title: `Projects - ${siteTitle}`,
})

export default function Index() {
  return <h1 className="text-3xl font-bold">Project List</h1>
}
