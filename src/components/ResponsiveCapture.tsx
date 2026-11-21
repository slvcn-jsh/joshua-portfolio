import type { ProjectSummary } from '../content/project-index'

type Capture = ProjectSummary['screenshots'][number]
function captureSource(image: Capture, width: number) {
  const name = image.src
    .split('/')
    .pop()!
    .replace(/\.webp$/, '')
  return `/images/previews/${name}-${Math.min(width, image.width)}.webp`
}

export function ResponsiveCapture({
  image,
  sizes,
  loading = 'lazy',
  fetchPriority = 'auto',
  className,
  decorative = false,
}: {
  image: Capture
  sizes: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'auto'
  className?: string
  decorative?: boolean
}) {
  const widths = [
    ...new Set([Math.min(480, image.width), Math.min(960, image.width)]),
  ]
  return (
    <img
      className={className}
      src={captureSource(image, 480)}
      srcSet={widths.map((w) => `${captureSource(image, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={decorative ? '' : image.alt}
      aria-hidden={decorative ? true : undefined}
      width={image.width}
      height={image.height}
      loading={loading}
      fetchPriority={fetchPriority}
    />
  )
}
