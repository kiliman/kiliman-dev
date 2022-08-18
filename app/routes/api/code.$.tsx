import { type LoaderArgs } from '@remix-run/node'
import path from 'path'

declare var CONTENT: KVNamespace

export const loader = async ({ params }: LoaderArgs) => {
  let filename = params['*']
  if (filename === undefined) {
    throw new Response('Not Found', { status: 404 })
  }
  const slug = path.basename(filename, '.js')
  const data = (await CONTENT.get(`${slug}`, 'json')) as any
  if (!data) {
    throw new Response('Not Found', { status: 404 })
  }
  return new Response(data.code, {
    headers: {
      'Content-Type': 'application/javascript',
    },
  })
}
