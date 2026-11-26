import { useEffect, useId, useRef, type RefObject } from 'react'

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/* ============================================================================
   CUBE -> 4-POINTED CRYSTAL STAR -> TOP PROGRESS BAR CHOREOGRAPHY
   - Single 60fps direct-DOM rAF loop (zero React re-renders, sleeps when idle)
   - As the user scrolls down out of Hero:
     1) The 3D glass Cube shrinks smoothly while arcing up-left along a cubic
        quadratic Bézier trajectory toward the leading tip of the top progress bar
     2) Mid-flight, the cube morphs seamlessly into WalkingLab's 4-pointed star
        with a delicate tangent-aligned stardust comet trail
     3) Upon touching the top edge, the star docks into the leading tip of
        #scroll-progress, igniting the progress hairline and gliding smoothly
        across the entire viewport width as the user explores the page
   ============================================================================ */
export function StarProgressFlight({
  cubeAnchorRef,
  cubeFlightRef,
  cubeRaysRef,
  cubeAxisRef,
}: {
  cubeAnchorRef: RefObject<HTMLDivElement | null>
  cubeFlightRef: RefObject<HTMLDivElement | null>
  cubeRaysRef: RefObject<SVGSVGElement | null>
  cubeAxisRef: RefObject<HTMLDivElement | null>
}) {
  const uid = useId()
  const barRef = useRef<HTMLDivElement>(null)
  const starCarrierRef = useRef<HTMLDivElement>(null)
  const starSvgRef = useRef<SVGSVGElement>(null)
  const tailRef = useRef<HTMLDivElement>(null)
  const dockFlareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let displayPct = 0
    let displayFlight = 0
    let p0x = window.innerWidth * 0.5
    let p0y = window.innerHeight * 0.5

    const measureAnchor = () => {
      const vw = window.innerWidth
      const vh = Math.max(1, window.innerHeight)
      const anchor = cubeAnchorRef.current
      if (anchor) {
        const rect = anchor.getBoundingClientRect()
        p0x = rect.left + rect.width * 0.5
      } else {
        p0x = vw * 0.5
      }
      p0y = vh * 0.5
    }

    const applyFrame = (immediate = false) => {
      const vw = Math.max(1, window.innerWidth)
      const vh = Math.max(1, window.innerHeight)
      const scrollable = Math.max(1, document.documentElement.scrollHeight - vh)
      const scrollY = window.scrollY
      const flightDist = Math.max(240, vh * 0.52)

      const targetPct = Math.min(1, Math.max(0, scrollY / scrollable))
      const targetFlight = Math.min(1, Math.max(0, scrollY / flightDist))

      if (reduced || immediate) {
        displayPct = targetPct
        displayFlight = targetFlight
      } else {
        // Silky spring-damped chase so even notched mouse-wheel steps glide like silk
        displayPct += (targetPct - displayPct) * 0.18
        displayFlight += (targetFlight - displayFlight) * 0.14
        if (Math.abs(targetPct - displayPct) < 0.0002) displayPct = targetPct
        if (Math.abs(targetFlight - displayFlight) < 0.0002) displayFlight = targetFlight
      }

      const bar = barRef.current
      const carrier = starCarrierRef.current
      const starSvg = starSvgRef.current
      const tail = tailRef.current
      const dockFlare = dockFlareRef.current
      const cubeFlight = cubeFlightRef.current
      const cubeRays = cubeRaysRef.current
      const cubeAxis = cubeAxisRef.current

      if (reduced) {
        if (bar) {
          bar.style.transform = `scaleX(${displayPct})`
          bar.style.opacity = displayPct > 0.002 ? '1' : '0'
        }
        if (carrier) carrier.style.opacity = '0'
        return false
      }

      const u = displayFlight
      const e = easeInOutCubic(u)

      // Exact tip of the top scroll progress bar
      const barTipX = Math.max(10, Math.min(vw - 4, displayPct * vw))
      const barTipY = 1.5

      // Graceful upward-left convex Bézier curve from resting Cube center -> top-left progress bar tip
      const p1x = Math.min(p0x * 0.62, vw * 0.30)
      const p1y = vh * 0.15

      const omt = 1 - e
      const bx = omt * omt * p0x + 2 * omt * e * p1x + e * e * barTipX
      const by = omt * omt * p0y + 2 * omt * e * p1y + e * e * barTipY

      // Exact flight tangent angle for the stardust comet trail
      const dxdt = 2 * omt * (p1x - p0x) + 2 * e * (barTipX - p1x)
      const dydt = 2 * omt * (p1y - p0y) + 2 * e * (barTipY - p1y)
      const tangentDeg = Math.atan2(dydt, dxdt) * (180 / Math.PI)

      // 1) Hero axis hairlines & directional rays soften cleanly away as the cube departs
      const guidesOpacity = 1 - smoothstep(0.0, 0.28, u)
      if (cubeAxis) cubeAxis.style.opacity = String(guidesOpacity)
      if (cubeRays) {
        cubeRays.style.opacity = String(guidesOpacity)
        cubeRays.style.transform = `scale(${1 - 0.12 * smoothstep(0.0, 0.32, u)})`
      }

      // 2) Hero 3D glass cube shrinks along the exact Bézier arc & dissolves into the emerging star
      if (cubeFlight) {
        const cubeScale = 1 - 0.88 * e
        const cubeOpacity = 1 - smoothstep(0.28, 0.56, u)
        const dx = bx - p0x
        const dy = by - p0y
        cubeFlight.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${cubeScale}) rotate(${-40 * e}deg)`
        cubeFlight.style.opacity = String(cubeOpacity)
        cubeFlight.style.pointerEvents = u < 0.08 ? 'auto' : 'none'
      }

      // 3) Fixed crystal 4-pointed star blooms at the exact cube coordinate, arcs up-left, and docks onto #scroll-progress
      const starOpacity = smoothstep(0.16, 0.40, u)
      const bloom = smoothstep(0.16, 0.44, u)
      const settle = smoothstep(0.50, 1.0, u)
      const starScale = 0.40 + 0.86 * bloom - 0.68 * settle // 0.40 -> 1.26 mid-flight -> 0.58 crisp docked jewel
      const starSpin = e * 90 + displayPct * 180

      if (carrier) {
        carrier.style.transform = `translate3d(${bx}px, ${by}px, 0)`
        carrier.style.opacity = u > 0.01 ? String(starOpacity) : '0'
      }
      if (starSvg) {
        starSvg.style.transform = `translate(-50%, -50%) scale(${starScale}) rotate(${starSpin}deg)`
      }

      // 4) Delicate tangent-aligned stardust comet trail visible only during mid-flight arc
      if (tail) {
        const tailOpacity =
          smoothstep(0.24, 0.48, u) * (1 - smoothstep(0.84, 1.0, u)) * 0.85
        const tailScaleX = 0.55 + 0.65 * Math.sin(u * Math.PI)
        tail.style.opacity = String(tailOpacity)
        tail.style.transform = `translateY(-50%) rotate(${tangentDeg}deg) scaleX(${tailScaleX})`
      }

      // 5) Horizontal starlight flare welding the docked star seamlessly into the top progress hairline
      const dockBlend = smoothstep(0.76, 1.0, u)
      if (dockFlare) {
        dockFlare.style.opacity = String(dockBlend * 0.92)
      }

      // 6) Top progress hairline ignites right as the star docks, stretching smoothly from left edge to star tip
      if (bar) {
        bar.style.transform = `scaleX(${displayPct})`
        bar.style.opacity = String(smoothstep(0.70, 0.98, u))
      }

      return Math.abs(targetPct - displayPct) > 0.0002 || Math.abs(targetFlight - displayFlight) > 0.0002
    }

    const tick = () => {
      raf = 0
      const needsMore = applyFrame(false)
      if (needsMore) {
        raf = requestAnimationFrame(tick)
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onResize = () => {
      measureAnchor()
      applyFrame(true)
    }

    measureAnchor()
    applyFrame(true)

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onResize)
    }
  }, [cubeAnchorRef, cubeFlightRef, cubeRaysRef, cubeAxisRef])

  const starGradId = `${uid}-star-flight`

  return (
    <>
      <div ref={barRef} id="scroll-progress" aria-hidden="true" />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
        <div
          ref={starCarrierRef}
          className="absolute top-0 left-0 opacity-0 will-change-transform"
        >
          {/* Gossamer tangent-aligned stardust comet tail during mid-flight */}
          <div
            ref={tailRef}
            className="absolute top-0 right-0 h-[2px] w-[86px] origin-right opacity-0 will-change-transform"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.24) 38%, rgba(192, 132, 252, 0.62) 78%, rgba(255, 255, 255, 0.96) 100%)',
            }}
          />

          {/* Horizontal hairline flare welding the docked star seamlessly into #scroll-progress */}
          <div
            ref={dockFlareRef}
            className="absolute top-0 left-0 h-[2px] w-[48px] -translate-x-[72%] -translate-y-1/2 opacity-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.48) 38%, rgba(186, 230, 253, 0.72) 66%, rgba(255, 255, 255, 0.96) 80%, transparent 100%)',
            }}
          />

          {/* WalkingLab signature 4-pointed crystal star */}
          <svg
            ref={starSvgRef}
            viewBox="556 -4 48 50"
            fill="none"
            className="absolute top-0 left-0 size-[22px] will-change-transform"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(168, 139, 250, 0.68))',
            }}
          >
            <defs>
              <linearGradient id={starGradId} x1="580" y1="0" x2="580" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="52%" stopColor="#dbeafe" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <path
              d="M560 22.2717C570.423 17.531 574.717 12.4334 579.213 0C584.017 13.9085 588.159 19.0791 600.097 22.2717C587.929 25.796 583.757 30.5546 579.213 41.8708C572.999 29.5419 568.587 25.9832 560 22.2717Z"
              fill={`url(#${starGradId})`}
            />
          </svg>
        </div>
      </div>
    </>
  )
}
