import { json, LoaderFunction } from 'remix'
declare var BLOG_CONTENT: KVNamespace

export const loader: LoaderFunction = async () => {
  const data = (await BLOG_CONTENT.get('$$content-sha', 'json')) || {
    commit: { sha: '' },
  }
  return json(data)
}
