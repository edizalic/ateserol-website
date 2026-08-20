import type { CSSProperties } from 'react'

export type IllustratedIconName =
  | 'ates-erol-logo'
  | 'feasibility-project-thinking'
  | 'strategy-decision-making'
  | 'research-data-ai'
  | 'portfolio'
  | 'tough-but-fair'
  | 'curiosity-systems'
  | 'course-classification'
  | 'course-functions'
  | 'courses'
  | 'teaching-archive'
  | 'resources'
  | 'presentations-materials'
  | 'reflections'
  | 'contact'

type Props = {
  name: IllustratedIconName
  size?: number | string
  className?: string
  style?: CSSProperties
  alt?: string
}

/** Large illustrated marks supplied for the site's primary navigation and page sections. */
export default function IllustratedIcon({ name, size = 64, className, style, alt = '' }: Props) {
  return (
    <img
      src={`/icons/illustrated/${name}.png`}
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block', ...style }}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      loading="eager"
      decoding="async"
    />
  )
}
