export default function HeroImage({ frontmatter }: any) {
  if (!frontmatter?.image) return null
  return (
    <div className="mb-6 -mt-6">
      <div className="text-center">
        <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
          <img
            src={frontmatter.image.url}
            className="object-cover object-center w-full h-48 sm:h-96"
          />
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Credit:{' '}
          <a href={frontmatter.image.credit.url}>
            {frontmatter.image.credit.text}
          </a>
          {' | '}
          <a href={frontmatter.image.source.url}>
            {frontmatter.image.source.text}
          </a>
        </p>
      </div>
    </div>
  )
}
