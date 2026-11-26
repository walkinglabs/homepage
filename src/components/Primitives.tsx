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
  className = 'h-[21px] w-auto',
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
      className={`shrink-0 drop-shadow-[0_2px_10px_rgba(0,229,176,0.22)] ${className}`}
    >
      <defs>
        {/* Brushed liquid-titanium & frosted glacier fill for main W */}
        <linearGradient id={metalMain} x1="80" y1="0" x2="1120" y2="579" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="38%" stopColor="#d4ecf8" stopOpacity="0.88" />
          <stop offset="76%" stopColor="#72b9de" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#1b4d78" stopOpacity="0.86" />
        </linearGradient>

        {/* Sculpted inner facet shadow giving 3D architectural fold depth */}
        <linearGradient id={facetShade} x1="449" y1="0" x2="960" y2="579" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#051324" stopOpacity="0.58" />
          <stop offset="100%" stopColor="#0a2844" stopOpacity="0.16" />
        </linearGradient>

        {/* Specular chrome rim highlight */}
        <linearGradient id={edgeSpec} x1="0" y1="0" x2="1241" y2="579" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="52%" stopColor="#bfe8f7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
        </linearGradient>

        {/* Bioluminescent crystal prism fill for detached top-right wing */}
        <linearGradient id={wingPrism} x1="1473" y1="0" x2="1118" y2="254" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e6fff9" />
          <stop offset="32%" stopColor="#00e5b0" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>

        <linearGradient id={wingEdge} x1="1473" y1="0" x2="1118" y2="254" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00e5b0" />
        </linearGradient>
      </defs>

      {/* Main WalkingLabs W sculpted metallic prism */}
      <path
        d="M449.337 579L0 0H449.337L571.912 271.776L727.615 0H959.512L1241.1 579H959.512L826.999 271.776L704.425 579H449.337Z"
        fill={`url(#${metalMain})`}
        stroke={`url(#${edgeSpec})`}
        strokeWidth="16"
        strokeLinejoin="miter"
        strokeMiterlimit="3"
      />

      {/* Sculpted 3D inner-fold shadow facet */}
      <path
        d="M449.337 0L571.912 271.776L704.425 579H449.337L255 190L449.337 0Z"
        fill={`url(#${facetShade})`}
      />
      <path
        d="M826.999 271.776L959.512 0L1241.1 579H959.512L826.999 271.776Z"
        fill={`url(#${facetShade})`}
        fillOpacity="0.6"
      />

      {/* Razor specular ridge lines along the geometric valley folds */}
      <path
        d="M571.912 271.776L704.425 579M727.615 0L571.912 271.776"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="14"
      />

      {/* Signature floating top-right wing facet — luminous emerald-crystal prism */}
      <path
        d="M1473 0H1227.85L1118.53 254.051H1357.05L1473 0Z"
        fill={`url(#${wingPrism})`}
        stroke={`url(#${wingEdge})`}
        strokeWidth="16"
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
      {/* Sculpted metallic W prism acts directly as the initial "W" of the unified WalkingLab logotype */}
      <WalkingLabsIcon className="h-[20px] w-auto shrink-0 translate-y-[1px] transition-transform duration-300 group-hover:scale-[1.04]" />
      <span
        aria-hidden="true"
        className="-ml-[3px] inline-flex items-baseline text-[19.5px] leading-none font-bold tracking-[0.025em] text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <span>alk</span>
        <span className="relative mr-[0.025em] inline-block tracking-normal">
          <svg
            viewBox="556 -4 48 50"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute -top-[0.3em] left-1/2 h-[0.6em] w-[0.6em] -translate-x-1/2 drop-shadow-[0_0_7px_rgba(0,229,176,0.82)] transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"
          >
            <defs>
              <linearGradient id={starFill} x1="580" y1="0" x2="580" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="48%" stopColor="#5fffe0" />
                <stop offset="100%" stopColor="#0ea5e9" />
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
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el || rafRef.current) return
    const cx = e.clientX
    const cy = e.clientY
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${cx - rect.left}px`)
      el.style.setProperty('--my', `${cy - rect.top}px`)
    })
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      aria-hidden="true"
      className="group relative z-10 w-full overflow-hidden pt-2 pb-0 select-none"
    >
      {/* Subtle interactive cursor light sheen gliding across the clean letters */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(0, 229, 176, 0.18), rgba(56, 189, 248, 0.08) 45%, transparent 72%)',
        }}
      />

      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <svg
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
          </defs>

          <text
            x="600"
            y="162"
            textAnchor="middle"
            textLength="1188"
            lengthAdjust="spacingAndGlyphs"
            fill={`url(#${fillGrad})`}
            fontFamily="Geist, -apple-system, sans-serif"
            fontSize="188"
            fontWeight="450"
            letterSpacing="-0.055em"
          >
            WALKINGLAB
          </text>
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
