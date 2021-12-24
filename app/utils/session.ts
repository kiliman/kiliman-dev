// app/sessions.js
import { createCookie, createCloudflareKVSessionStorage } from 'remix'
declare var SESSION: KVNamespace

// In this example the Cookie is created separately.
const sessionCookie = createCookie('__session', {
  path: '/',
  secrets: ['r3m1xr0ck5'],
  sameSite: true,
})

const { getSession, commitSession, destroySession } =
  createCloudflareKVSessionStorage({
    // The KV Namespace where you want to store sessions
    kv: SESSION,
    cookie: sessionCookie,
  })

export { getSession, commitSession, destroySession }
