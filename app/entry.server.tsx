import type { EntryContext } from '@remix-run/cloudflare'
import { HandleDataRequestFunction } from '@remix-run/cloudflare'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'

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
  addSecurityHeaders(responseHeaders)

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}

export const handleDataRequest: HandleDataRequestFunction = (
  response: Response,
) => {
  addSecurityHeaders(response.headers)
  return response
}

function addSecurityHeaders(responseHeaders: Headers) {
  responseHeaders.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains',
  )
  responseHeaders.set('X-Frame-Options', 'SAMEORIGIN')
  responseHeaders.set('X-Content-Type-Options', 'nosniff')
}
