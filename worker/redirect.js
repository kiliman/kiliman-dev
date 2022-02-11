export async function redirectHandler(event) {
  const url = new URL(event.request.url)
  // get url from REDIRECT kv namespace
  const redirectUrl = await REDIRECT.get(url.pathname)
  if (!redirectUrl) {
    return new Response(`No redirect found for ${url}`, { status: 404 })
  }
  return Response.redirect(redirectUrl, 302)
}
