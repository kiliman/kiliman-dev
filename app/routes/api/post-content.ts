import type { ActionFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
declare var CONTENT: KVNamespace
declare var API_KEY: string

export const action: ActionFunction = async ({ request }) => {
  const key = request.headers.get('Authorization')
  if (key !== `Bearer ${API_KEY}`) {
    return new Response(`Unauthorized ${key}`, { status: 401 })
  }
  const data: any = await request.json()
  console.log(`posting ${data.slug}...`)
  await CONTENT.put(data.slug, JSON.stringify(data))
  return json({ success: true, slug: data.slug })
}
