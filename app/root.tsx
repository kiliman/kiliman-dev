import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import clsx from 'clsx'
import NProgress from 'nprogress'
import { useEffect, useRef } from 'react'

import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useTransition,
} from '@remix-run/react'

import codehikeCss from '@code-hike/mdx/dist/index.css'
import Logo from '~/components/Logo'
import customCss from '~/styles/custom.css'
import globalCss from '~/styles/global.css'
import nprogressCss from '~/styles/nprogress.css'
import tailwindCss from '~/styles/tailwind.css'
import { siteTitle } from '~/utils/constants'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalCss },
    { rel: 'stylesheet', href: tailwindCss },
    { rel: 'stylesheet', href: codehikeCss },
    { rel: 'stylesheet', href: nprogressCss },
    { rel: 'stylesheet', href: customCss },
  ]
}

export const meta: MetaFunction = () => ({
  title: siteTitle,
})

export const loader: LoaderFunction = () =>
  json({
    title: siteTitle,
  })

export default function App() {
  const transition = useTransition()
  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    if (transition.state === 'idle') {
      NProgress.done()
    } else {
      NProgress.start()
    }
  }, [transition.state])

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
          <pre>{error.stack}</pre>
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
        {/* Cloudflare Web Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "cf7ec1461d994872b4a5463f0a1b336b"}'
          ></script>
        )}
      </body>
    </html>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <div className="container p-4 m-auto sm:px-12 sm:py-6 lg:max-w-screen-lg">
          {children}
        </div>
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

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog/' },
  { name: 'Projects', href: '/projects/' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const closer = useRef<any>(null)
  const transtition = useTransition()
  // hook to close the mobile menu after the transition goes to idle
  useEffect(() => {
    if (transtition.state === 'idle') {
      if (closer.current) closer.current()
      closer.current = null
    }
  }, [transtition.state])

  return (
    <Disclosure as="nav" className="border-b bg-slate-900 border-slate-600">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-start flex-1 ml-16 md:ml-0 md:items-stretch">
                <div className="flex items-center flex-shrink-0">
                  <Link
                    to="/"
                    title={siteTitle}
                    className="flex items-center gap-4 text-white"
                  >
                    <Logo className="h-6 sm:h-8" />
                    <h1 className="font-bold text-md sm:text-2xl">
                      {siteTitle}
                    </h1>
                  </Link>
                </div>
                <div className="hidden md:block md:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      //@ts-expect-error doesn't like aria-current isActive
                      <NavLink
                        key={item.name}
                        to={item.href}
                        prefetch="intent"
                        className={({ isActive }) =>
                          clsx(
                            isActive
                              ? 'bg-slate-500 text-white'
                              : 'text-slate-300 hover:text-slate-600',
                            'px-3 py-2 rounded-md text-sm font-medium  hover:bg-slate-400',
                          )
                        }
                        aria-current={({ isActive }: { isActive: boolean }) =>
                          isActive ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="p-1 rounded-full text-slate-400 bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={clsx([
                              active ? 'bg-slate-100' : '',
                              'block px-4 py-2 text-sm text-slate-700',
                            ])}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings"
                            className={clsx([
                              active ? 'bg-slate-100' : '',
                              'block px-4 py-2 text-sm text-slate-700',
                            ])}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/logout"
                            className={clsx([
                              active ? 'bg-slate-100' : '',
                              'block px-4 py-2 text-sm text-slate-700',
                            ])}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            {({ close }) => (
              <div className="flex flex-col gap-2 px-2 pt-2 pb-3">
                {navigation.map(item => (
                  //@ts-expect-error doesn't like aria-current isActive
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => {
                      closer.current = close
                    }}
                    prefetch="intent"
                    className={({ isActive }) =>
                      clsx([
                        isActive
                          ? 'bg-slate-500 text-white'
                          : 'text-slate-300 hover:text-slate-600',
                        'px-3 py-2 rounded-md text-sm font-medium  hover:bg-slate-400',
                      ])
                    }
                    aria-current={({ isActive }: { isActive: boolean }) =>
                      isActive ? 'page' : undefined
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
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
