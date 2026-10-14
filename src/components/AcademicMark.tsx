import IllustratedIcon from './IllustratedIcon'

type Props = { size?: number }

/**
 * Brand crest for Ateş Erol.
 * The asset is a full-color seal on a transparent background, so it reads on both light and dark surfaces.
 */
export default function AcademicMark({ size = 58 }: Props) {
  return (
    <IllustratedIcon
      name="ates-erol-logo"
      size={size}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        flexShrink: 0,
      }}
      alt=""
    />
  )
}
