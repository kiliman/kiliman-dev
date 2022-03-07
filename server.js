import { createEventHandler } from '@remix-run/cloudflare-workers'
import * as build from '@remix-run/dev/server-build'

const handler = createEventHandler({ build })
const handleFetch = event => {
  const url = new URL(event.request.url)
  if (url.hostname === 'rmx.fyi') {
    event.respondWith(redirectHandler(event))
    return
  }
  handler(event)
}
addEventListener('fetch', handleFetch)

async function redirectHandler(event) {
  const url = new URL(event.request.url)
  // get url from REDIRECT kv namespace
  const redirectUrl = await REDIRECT.get(url.pathname)
  if (!redirectUrl) {
    return new Response(`No redirect found for ${url}`, { status: 404 })
  }
  return Response.redirect(redirectUrl, 302)
}
