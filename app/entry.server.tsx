import { renderToString } from 'react-dom/server'
import { RemixServer, useBeforeUnload } from 'remix'
import type { EntryContext } from 'remix'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  const url = new URL(request.url)
  if (url.pathname === '/blog/test') {
    responseHeaders.delete('Content-Type')

    return new Response(JSON.stringify(remixContext.routeData), {
      status: responseStatusCode,
      headers: responseHeaders,
    })
  }
  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
