import { RemixServer, useBeforeUnload } from 'remix'
import { renderToString } from 'react-dom/server'
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
  // Response with status (101, 204, 205, or 304) cannot have a body
  if ([101, 204, 205, 304].includes(responseStatusCode)) {
    return new Response(null, {
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
