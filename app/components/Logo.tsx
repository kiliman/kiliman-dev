import { siteTitle } from '~/utils/constants'

export default function Logo({ className }: any) {
  return (
    <svg
      viewBox="0 0 116.46 42.16"
      role="img"
      className={className}
      fill="currentColor"
    >
      <title id="title">{siteTitle}</title>
      <polygon points="0 36.43 19.73 18.93 22.91 21.32 46.77 0 54.09 8.59 57.74 6.05 69.84 19.89 82.73 9.55 95.78 20.36 98.16 18.22 116.46 33.89 101.66 24.98 104.05 31.98 83.68 14.64 76.37 20.84 83.05 40.89 57.74 12.09 54.89 13.68 47.89 5.73 32.3 42.16 31.02 28.64 19.41 24.66 0 36.43" />
    </svg>
  )
}
