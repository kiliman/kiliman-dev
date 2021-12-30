import { ActionFunction, json } from 'remix'
declare var CONTENT: KVNamespace
declare var POST_API_KEY: string

export const action: ActionFunction = async ({ request }) => {
  try {
    const key = request.headers.get('Authorization')
    if (key !== `Bearer ${POST_API_KEY}`) {
      return new Response(`Unauthorized ${key}`, { status: 401 })
    }
    const data = await request.json()
    await CONTENT.put(data.slug, JSON.stringify(data))
    return json({ success: true })
  } catch (e) {
    //@ts-expect-error
    return json({ message: e.message, stack: e.stack })
  }
}
