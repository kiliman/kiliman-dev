// app/sessions.js
import { createCloudflareKVSessionStorage, createCookie } from 'remix'
declare var SESSION: KVNamespace

// In this example the Cookie is created separately.
const sessionCookie = createCookie('__session', {
  path: '/',
  secrets: ['r3m1xr0ck5'],
  httpOnly: true,
  secure: true,
  sameSite: true,
})

const { getSession, commitSession, destroySession } =
  createCloudflareKVSessionStorage({
    // The KV Namespace where you want to store sessions
    kv: SESSION,
    cookie: sessionCookie,
  })

export { getSession, commitSession, destroySession }
