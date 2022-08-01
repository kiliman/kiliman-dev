import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from '~/utils/session'
import { debug } from '~/utils/debug'
import { siteTitle } from '~/utils/constants'

export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'))
  const time = Number(session.get('time') ?? 0)
  console.log({ time })
  session.set('time', Date.now())
  const data = { message: 'hello world', time }

  return json(data, { headers: { 'set-cookie': await commitSession(session) } })
}

export let meta: MetaFunction = () => {
  return {
    title: siteTitle,
    description: 'Blog about web development',
  }
}

export default function Index() {
  const { message, time } = useLoaderData()
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to {siteTitle}</h1>
    </>
  )
}

function Time({ utc }: { utc: number }) {
  const local = new Date(utc).toLocaleString()
  return <time>{local}</time>
}
