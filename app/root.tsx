import {
  Link,
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  NavLink as RemixNavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix'
import type { LinksFunction } from 'remix'
import clsx from 'clsx'
import { siteTitle } from '~/utils/constants'

import globalCss from '~/styles/global.css'
import tailwindCss from '~/styles/tailwind.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalCss },
    { rel: 'stylesheet', href: tailwindCss },
  ]
}

export const meta: MetaFunction = () => ({
  title: siteTitle,
})

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="w-full text-white bg-slate-900">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-12 py-6 border-b border-slate-600">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            title={siteTitle}
            className="flex items-center gap-4 text-white"
          >
            <Logo />
            <h1 className="text-2xl font-bold">{siteTitle}</h1>
          </Link>
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-6 m-0">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/blog/">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/projects/">Projects</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex-1">
        <div className="w-full px-12 py-6">{children}</div>
      </div>
      <footer className="px-12 py-6 border-t border-slate-600">
        <div className="flex items-center justify-center w-full gap-4">
          <p>&copy; Michael Carter</p>
          <div>
            <a href="https://twitter.com/kiliman">
              <Twitter />
            </a>
          </div>
          <div>
            <a href="https://github.com/kiliman">
              <GitHub />
            </a>
          </div>
          <div>
            <a href="https://www.youtube.com/channel/UCNHuf5ijvojrKoeTvSgsfoA">
              <YouTube />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ to, children }: any) {
  return (
    <RemixNavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'text-white hover:text-slate-300 px-2 py-1 rounded-sm',
          isActive && 'bg-slate-600',
        )
      }
    >
      {children}
    </RemixNavLink>
  )
}

function Logo() {
  return (
    <svg
      viewBox="0 0 116.46 42.16"
      role="img"
      width="106"
      height="30"
      fill="currentColor"
    >
      <title id="title">{siteTitle}</title>
      <polygon points="0 36.43 19.73 18.93 22.91 21.32 46.77 0 54.09 8.59 57.74 6.05 69.84 19.89 82.73 9.55 95.78 20.36 98.16 18.22 116.46 33.89 101.66 24.98 104.05 31.98 83.68 14.64 76.37 20.84 83.05 40.89 57.74 12.09 54.89 13.68 47.89 5.73 32.3 42.16 31.02 28.64 19.41 24.66 0 36.43" />
    </svg>
  )
}

function Twitter() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-white"
    >
      <title>Twitter</title>
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  )
}

function GitHub() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-white"
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function YouTube() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-white"
    >
      <title>YouTube</title>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
