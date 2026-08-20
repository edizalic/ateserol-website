import IllustratedIcon from './IllustratedIcon'

type Props = { dark?: boolean }

/**
 * Brand monogram mark for Ateş Erol.
 * Uses the illustrated logo asset; the `dark` prop inverts it for use on dark backgrounds.
 */
export default function AcademicMark({ dark = false }: Props) {
  return (
    <IllustratedIcon
      name="ates-erol-logo"
      size={58}
      style={{
        width: 58,
        height: 56,
        objectFit: 'contain',
        filter: dark ? 'brightness(0) invert(1)' : 'none',
      }}
      alt=""
    />
  )
}
