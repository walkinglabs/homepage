import { useEffect, useId, useRef, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function CornerBrackets({
  size = 10,
  className = 'text-[#eaf4fa]',
}: {
  size?: number
  className?: string
}) {
  const s = `${size}px`
  return (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 border-t border-l border-current ${className}`}
        style={{ width: s, height: s }}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 right-0 border-t border-r border-current ${className}`}
        style={{ width: s, height: s }}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-0 border-b border-l border-current ${className}`}
        style={{ width: s, height: s }}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 bottom-0 border-r border-b border-current ${className}`}
        style={{ width: s, height: s }}
      />
    </>
  )
}

export function BoxTag({
  children,
  dot = false,
  accent = false,
  small = false,
}: {
  children: ReactNode
  dot?: boolean
  accent?: boolean
  small?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-2">
      {dot && <span className="sq-dot" aria-hidden="true" />}
      <span
        className={`box-tag ${accent ? 'box-tag--accent' : ''} ${small ? 'box-tag--sm' : ''}`}
      >
        {children}
      </span>
    </span>
  )
}

export function WipeLink({
  href,
  children,
  external = false,
  active = false,
  showStar = false,
  alwaysUnderline = false,
  arrow = false,
  className = '',
  onClick,
}: {
  href: string
  children: ReactNode
  external?: boolean
  active?: boolean
  showStar?: boolean
  alwaysUnderline?: boolean
  arrow?: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      data-active={active || undefined}
      onClick={onClick}
      className={`wipe-link ${alwaysUnderline ? 'wipe-link--always' : ''} ${className}`}
    >
      <span>{children}</span>
      {showStar && (
        <span className="wipe-star" aria-hidden="true">
          *
        </span>
      )}
      {arrow && <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />}
    </a>
  )
}

export function WalkingLabsIcon({
  className = 'h-[17px] w-auto',
}: {
  className?: string
}) {
  const uid = useId()
  const metalMain = `${uid}-mm`
  const facetShade = `${uid}-fs`
  const edgeSpec = `${uid}-es`
  const wingPrism = `${uid}-wp`
  const wingEdge = `${uid}-we`

  return (
    <svg
      viewBox="-36 -36 1545 651"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <defs>
        {/* Understated matte cool-platinum / slate-silver fill for main W */}
        <linearGradient id={metalMain} x1="80" y1="0" x2="1120" y2="579" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c5d0dc" stopOpacity="0.88" />
          <stop offset="42%" stopColor="#93a2b4" stopOpacity="0.82" />
          <stop offset="78%" stopColor="#647488" stopOpacity="0.76" />
          <stop offset="100%" stopColor="#455568" stopOpacity="0.82" />
        </linearGradient>

        {/* Soft inner facet shadow for subtle 3D fold depth */}
        <linearGradient id={facetShade} x1="449" y1="0" x2="960" y2="579" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0b1623" stopOpacity="0.44" />
          <stop offset="100%" stopColor="#16273a" stopOpacity="0.14" />
        </linearGradient>

        {/* Quiet satin bevel rim */}
        <linearGradient id={edgeSpec} x1="0" y1="0" x2="1241" y2="579" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dce5ef" stopOpacity="0.4" />
          <stop offset="55%" stopColor="#9fb0c2" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#6d8196" stopOpacity="0.16" />
        </linearGradient>

        {/* Restrained cool mist-slate prism fill for detached top-right wing */}
        <linearGradient id={wingPrism} x1="1473" y1="0" x2="1118" y2="254" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bdd1d7" stopOpacity="0.86" />
          <stop offset="48%" stopColor="#8ba5b2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#617c8d" stopOpacity="0.82" />
        </linearGradient>

        <linearGradient id={wingEdge} x1="1473" y1="0" x2="1118" y2="254" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d8e6ea" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c98a6" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Main WalkingLab W sculpted matte-silver prism */}
      <path
        d="M449.337 579L0 0H449.337L571.912 271.776L727.615 0H959.512L1241.1 579H959.512L826.999 271.776L704.425 579H449.337Z"
        fill={`url(#${metalMain})`}
        stroke={`url(#${edgeSpec})`}
        strokeWidth="10"
        strokeLinejoin="miter"
        strokeMiterlimit="3"
      />

      {/* Sculpted 3D inner-fold shadow facets */}
      <path
        d="M449.337 0L571.912 271.776L704.425 579H449.337L255 190L449.337 0Z"
        fill={`url(#${facetShade})`}
      />
      <path
        d="M826.999 271.776L959.512 0L1241.1 579H959.512L826.999 271.776Z"
        fill={`url(#${facetShade})`}
        fillOpacity="0.52"
      />

      {/* Subtle specular ridge lines along the geometric valley folds */}
      <path
        d="M571.912 271.776L704.425 579M727.615 0L571.912 271.776"
        stroke="#e4edf5"
        strokeOpacity="0.24"
        strokeWidth="10"
      />

      {/* Detached top-right wing facet — quiet cool-slate prism */}
      <path
        d="M1473 0H1227.85L1118.53 254.051H1357.05L1473 0Z"
        fill={`url(#${wingPrism})`}
        stroke={`url(#${wingEdge})`}
        strokeWidth="10"
        strokeLinejoin="miter"
        strokeMiterlimit="3"
      />
    </svg>
  )
}

export function WalkingLabsMark({ className = '' }: { className?: string }) {
  const uid = useId()
  const starFill = `${uid}-sf`

  return (
    <span
      aria-label="WalkingLab"
      className={`group inline-flex items-baseline select-none ${className}`}
    >
      {/* Understated sculpted slate-silver W prism balanced to cap-height */}
      <WalkingLabsIcon className="h-[16.5px] w-auto shrink-0 translate-y-[0.5px] opacity-[0.82] transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-100" />
      <span
        aria-hidden="true"
        className="-ml-[2.5px] inline-flex items-baseline text-[19.5px] leading-none font-bold tracking-[0.025em] text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <span>alk</span>
        <span className="relative mr-[0.025em] inline-block tracking-normal">
          <svg
            viewBox="556 -4 48 50"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute -top-[0.09em] left-1/2 h-[0.38em] w-[0.38em] -translate-x-1/2 opacity-75 transition-all duration-300 group-hover:scale-110 group-hover:opacity-95"
          >
            <defs>
              <linearGradient id={starFill} x1="580" y1="0" x2="580" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#dbe4ec" />
                <stop offset="55%" stopColor="#a2b5c4" />
                <stop offset="100%" stopColor="#7a90a2" />
              </linearGradient>
            </defs>
            <path
              d="M560 22.2717C570.423 17.531 574.717 12.4334 579.213 0C584.017 13.9085 588.159 19.0791 600.097 22.2717C587.929 25.796 583.757 30.5546 579.213 41.8708C572.999 29.5419 568.587 25.9832 560 22.2717Z"
              fill={`url(#${starFill})`}
            />
          </svg>
          <span>ı</span>
        </span>
        <span>nglab</span>
      </span>
    </span>
  )
}

/* Monumental full-width startup footer wordmark (WALKINGLAB) — smooth clean Geist gradient matching display headings */
export function MonumentalFooterWordmark() {
  const uid = useId()
  const fillGrad = `${uid}-mfg`
  const sheenGrad = `${uid}-sheen`
  const glyphs = `${uid}-glyphs`
  const svgRef = useRef<SVGSVGElement>(null)
  const sheenRef = useRef<SVGRadialGradientElement>(null)
  const rafRef = useRef(0)

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current) return
    const { clientX, clientY } = e
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const svg = svgRef.current
      const sheen = sheenRef.current
      if (!svg || !sheen) return

      const rect = svg.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const { width, height } = svg.viewBox.baseVal
      sheen.setAttribute('cx', String((clientX - rect.left) * width / rect.width))
      sheen.setAttribute('cy', String((clientY - rect.top) * height / rect.height))
    })
  }

  return (
    <div
      onPointerMove={onMove}
      aria-hidden="true"
      className="group relative z-10 w-full overflow-hidden pt-2 pb-0 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <svg
          ref={svgRef}
          viewBox="0 0 1200 184"
          className="block w-full translate-y-[11%]"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            {/* Exact smooth clean display gradient matching "Pick one course and finish it." — zero scanlines */}
            <linearGradient id={fillGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#edf5fa" stopOpacity="0.96" />
              <stop offset="52%" stopColor="#edf5fa" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#edf5fa" stopOpacity="0.16" />
            </linearGradient>
            <radialGradient ref={sheenRef} id={sheenGrad} gradientUnits="userSpaceOnUse" cx="600" cy="92" r="360">
              <stop offset="0%" stopColor="#a9f4ee" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#8ad1fa" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#8ad1fa" stopOpacity="0" />
            </radialGradient>
            <text
              id={glyphs}
              x="600"
              y="162"
              textAnchor="middle"
              textLength="1188"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="Geist, -apple-system, sans-serif"
              fontSize="188"
              fontWeight="450"
              letterSpacing="-0.055em"
            >
              WALKINGLAB
            </text>
          </defs>
          <use href={`#${glyphs}`} fill={`url(#${fillGrad})`} />
          <use
            href={`#${glyphs}`}
            fill={`url(#${sheenGrad})`}
            className="pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
          />
        </svg>
      </div>
    </div>
  )
}

/* Zero-React-rerender custom cursor using direct DOM transform + rAF coalescing */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let raf = 0
    let x = -100
    let y = -100
    let hovering = false

    const paint = () => {
      raf = 0
      el.style.transform = `translate3d(${x - 5}px, ${y - 5}px, 0)`
      el.style.opacity = '1'
      if (hovering) el.setAttribute('data-hover', 'true')
      else el.removeAttribute('data-hover')
    }

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const target = e.target as HTMLElement | null
      hovering = Boolean(target?.closest('a, button, summary, [role="button"]'))
      if (!raf) raf = requestAnimationFrame(paint)
    }

    const onLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className="custom-cursor" />
}
