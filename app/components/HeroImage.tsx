export default function HeroImage({ frontmatter }: any) {
  if (!frontmatter?.image) return null
  var imageUrl = frontmatter.image.url.replace(/\/public$/, '')
  return (
    <div className="mb-6 -mt-6">
      <div className="text-center">
        <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
          <img
            src={frontmatter.image.url}
            srcSet={`
            ${imageUrl}/w=640,h=256,fit=cover,gravity=0.5x0.5 640w,
            ${imageUrl}/w=1280,h=512,fit=cover,gravity=0.5x0.5 1280w,
            ${imageUrl}/w=1920,h=768,fit=cover,gravity=0.5x0.5 1920w`}
            sizes={`(min-width: 1280px) 1920px,
                    (min-width: 640px) 1280px,
                    640px`}
            className="object-cover object-center w-full h-48 sm:h-96 xl:h-[32rem]"
            alt={frontmatter.image.credit.text}
            loading="eager"
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
