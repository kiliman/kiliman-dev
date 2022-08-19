import type { ActionFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
declare var CONTENT: KVNamespace
declare var POST_API_KEY: string

export const action: ActionFunction = async ({ request }) => {
  try {
    const key = request.headers.get('Authorization')
    if (key !== `Bearer ${POST_API_KEY}`) {
      return new Response(`Unauthorized ${key}`, { status: 401 })
    }
    const data = await request.json()
    await CONTENT.put('blog/$index', JSON.stringify(data))
    return json({ success: true })
  } catch (e) {
    //@ts-expect-error
    return json({ message: e.message, stack: e.stack })
  }
}
