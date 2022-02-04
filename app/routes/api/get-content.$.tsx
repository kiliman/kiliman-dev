import { json, LoaderFunction } from 'remix'

declare var CONTENT: KVNamespace

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params['*']
  if (slug === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const data = await CONTENT.get(`${slug}`, 'json')
  if (data === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  return json(data)
}
