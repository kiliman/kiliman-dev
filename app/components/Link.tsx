import { Link as RemixLink } from '@remix-run/react'

export function Link({ to, size, color, children }: any) {
  return (
    <RemixLink
      to={to}
      className={`${size ?? 'text-lg'} ${
        color ?? 'text-white'
      } hover:underline`}
    >
      {children}
    </RemixLink>
  )
}
