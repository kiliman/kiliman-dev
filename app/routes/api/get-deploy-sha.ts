import { json, LoaderFunction } from '@remix-run/cloudflare'
declare var CONTENT: KVNamespace

export const loader: LoaderFunction = async () => {
  const data = (await CONTENT.get('$$deploy-sha', 'json')) || {
    commit: { sha: '' },
  }
  return json(data)
}
