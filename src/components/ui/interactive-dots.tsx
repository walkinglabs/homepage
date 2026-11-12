import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'
import { NO_ANIM } from '@/lib/no-anim'

/**
 * InteractiveDots — canvas twin of DotPattern.
 *
 * Same static look (a grid of `fill-border` dots under a mask), plus a
 * fluid, water-like cursor field:
 * - the hotspot chases the pointer on a time-corrected spring, so it feels
 *   weighty rather than glued;
 * - a fading trail of recent pointer positions paints a comet wake behind
 *   fast sweeps, and the wake radius grows with speed;
 * - every dot eases on its own clock — quick to light up, slow to settle —
 *   so the field ripples instead of sliding like a rigid mask;
 * - while hovering, rings of light roll outward from the cursor and bob the
 *   dots as they pass, with a soft pulse ripple every so often — the water
 *   never freezes while the cursor rests on it;
 * - clicking emits two concentric ripple rings that swell and push dots
 *   outward as the wavefronts pass.
 *
 * Renders a plain static grid under ?noanim / prefers-reduced-motion.
 */

interface InteractiveDotsProps {
  /** horizontal dot spacing in px */
  width?: number
  /** vertical dot spacing in px */
  height?: number
  /** base dot radius in px */
  cr?: number
  /** which CSS variable paints the resting dots */
  tone?: 'border' | 'foreground'
  /** resting dot opacity; boosted dots ramp toward 1 */
  alpha?: number
  /** A finer wavefront that travels farther across the hero. */
  fineRipples?: boolean
  className?: string
}

interface Dot {
  x: number
  y: number
  /** eased boost — each dot moves on its own clock */
  b: number
  waveGain: number
}

interface Ripple {
  x: number
  y: number
  r: number
  /** countdown before the ring starts expanding (secondary rings lag) */
  delay: number
  /** multiplies wave brightness/displacement; decays as the ripple ages */
  strength: number
  /** Direction of travel for ripples left by a moving pointer. */
  heading?: { x: number; y: number }
}

interface TrailPoint {
  x: number
  y: number
  t: number
}

/** radius around the cursor where dots react */
const FOCUS_RADIUS = 130
/** thickness of a ripple's wavefront band in px */
const WAVE_BAND = 44
/** how far ripple wavefronts push dots outward, in px */
const WAVE_PUSH = 3.2
/** cursor chase time constant, ms — smaller = snappier */
const POINTER_TAU = 70
/** dot light-up time constant, ms */
const SWELL_TAU = 110
/** dot settle time constant, ms — slower than swell, feels viscous */
const SETTLE_TAU = 300
/** trail points older than this stop contributing, ms */
const TRAIL_MS = 480
/** trail points weigh at most this fraction of the main hotspot */
const TRAIL_MAX = 0.85
/** hover wave: px between consecutive rings rolling out from the cursor */
const WAVE_WAVELENGTH = 64
/** hover wave: outward drift speed, px per ms */
const WAVE_SPEED = 0.09
/** hover wave: crest brightness on top of the hotspot */
const WAVE_AMP = 0.28
/** hover wave: how far the rings reach, in focus-radius multiples */
const WAVE_REACH = 1.45
/** hover wave: radial bob on a crest, px */
const WAVE_BOB = 1.4
/** hovering nearly still: pulse a soft ripple at this cadence, ms */
const AUTO_RIPPLE_MS = 1600
const AUTO_RIPPLE_STRENGTH = 0.3
/** ripple expansion speed, px per ms */
const RIPPLE_SPEED = 0.34
/** pointer speed (px/ms) at which the wake reaches full size */
const FULL_WAKE_SPEED = 2.2

function hexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i)
  if (!m) return fallback
  const n = Number.parseInt(m[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const smoothstep = (t: number) => t * t * (3 - 2 * t)

export function InteractiveDots({
  width = 16,
  height = 16,
  cr = 1,
  tone = 'border',
  alpha = 1,
  fineRipples = false,
  className,
}: InteractiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = NO_ANIM || prefersReducedMotion()

    const styles = getComputedStyle(canvas)
    const baseVar = styles.getPropertyValue(`--${tone}`).trim()
    const base = hexToRgb(baseVar, tone === 'foreground' ? [14, 15, 14] : [230, 229, 225])
    const accent = hexToRgb(styles.getPropertyValue('--brand'), [130, 65, 181])
    const baseStyle = `rgba(${base[0]},${base[1]},${base[2]},${alpha})`

    let dots: Dot[] = []
    let w = 0
    let h = 0

    // pointer state — x/y is the drawn (spring-chased) position, tx/ty the real one;
    // speed is estimated from raw pointer events, not the chase lag
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, inside: false, energy: 0, speed: 0 }
    const trail: TrailPoint[] = []
    const ripples: Ripple[] = []

    let raf = 0
    let running = false
    let onscreen = true
    let lastTime = 0
    let lastRawT = 0

    const waveGainAt = (x: number, y: number) => {
      if (!fineRipples) return 1
      // Keep a quiet band around the active area while the resting grid stays visible.
      const radius = Math.hypot((x - w * 0.5) / (w * 0.8), (y - h * 0.18) / (h * 0.82))
      return 1 - smoothstep(Math.max(0, Math.min(1, (radius - 0.5) / 0.34)))
    }

    const rebuild = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []
      for (let y = height / 2; y < h; y += height) {
        for (let x = width / 2; x < w; x += width) {
          dots.push({ x, y, b: 0, waveGain: waveGainAt(x, y) })
        }
      }
    }

    const localPoint = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const draw = (dt: number, now: number) => {
      // time-corrected spring chase — frame-rate independent
      const chase = 1 - Math.exp(-dt / POINTER_TAU)
      pointer.x += (pointer.tx - pointer.x) * chase
      pointer.y += (pointer.ty - pointer.y) * chase

      // wake radius breathes with pointer speed; decay it so stopping shrinks it
      pointer.speed *= Math.exp(-dt / 120)
      const focusR = (fineRipples ? 76 : FOCUS_RADIUS) * (1 + Math.min(pointer.speed / FULL_WAKE_SPEED, 1) * 0.85)
      const reach = fineRipples ? Math.min(520, w * 0.72) : focusR * WAVE_REACH
      const hoverReach = fineRipples ? focusR : reach
      const dragX = Math.max(-5, Math.min(5, (pointer.tx - pointer.x) * 0.15))
      const dragY = Math.max(-5, Math.min(5, (pointer.ty - pointer.y) * 0.15))

      // prune the stale trail
      while (trail.length > 0 && now - trail[0].t > TRAIL_MS) trail.shift()

      // advance ripples on a real-time clock
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]
        if (ripple.delay > 0) {
          ripple.delay -= dt
          continue
        }
        ripple.r += (fineRipples ? 0.42 : RIPPLE_SPEED) * dt
        ripple.strength *= Math.exp(-dt / (fineRipples ? 980 : 210))
        const maxRadius = fineRipples ? reach + 24 : Math.max(w, h) * 1.5
        if (ripple.strength < 0.015 || ripple.r > maxRadius) ripples.splice(i, 1)
      }

      const hovering = pointer.inside && (!fineRipples || now - lastRawT < 120)
      const easing = 1 - Math.exp(-dt / (fineRipples && !hovering ? 240 : 60))
      pointer.energy += ((hovering ? 1 : 0) - pointer.energy) * easing

      ctx.clearRect(0, 0, w, h)
      ctx.beginPath()

      let active = 0
      const lit: { dot: Dot; ox: number; oy: number }[] = []

      for (const dot of dots) {
        if (dot.waveGain === 0) {
          ctx.moveTo(dot.x + cr, dot.y)
          ctx.arc(dot.x, dot.y, cr, 0, Math.PI * 2)
          continue
        }

        let target = 0
        let ox = 0
        let oy = 0

        const dpx = dot.x - pointer.x
        const dpy = dot.y - pointer.y
        if (pointer.energy > 0.004 && Math.abs(dpx) < hoverReach && Math.abs(dpy) < hoverReach) {
          const d = Math.hypot(dpx, dpy)

          // hotspot with a smoothstep falloff
          if (d < focusR) {
            const t = 1 - d / focusR
            const falloff = smoothstep(t)
            target = falloff * (fineRipples ? 0.22 : 1)
            if (fineRipples) {
              ox += dragX * falloff * pointer.energy
              oy += dragY * falloff * pointer.energy
            }
          }

          // hover wave — rings of light rolling outward, bobbing dots as they pass
          const env = 1 - d / reach
          if (!fineRipples && env > 0) {
            const crest = Math.sin(((d - now * WAVE_SPEED) / WAVE_WAVELENGTH) * Math.PI * 2)
            if (crest > 0) {
              const m = WAVE_AMP * crest * smoothstep(env)
              target = Math.min(1.35, target + m)
              const inv = 1 / (d || 1)
              ox += dpx * inv * m * WAVE_BOB
              oy += dpy * inv * m * WAVE_BOB
            }
          }
        }

        // comet wake — fading proximity to recent pointer positions
        if (trail.length > 0) {
          const wakeR = focusR * 0.6
          for (const tp of trail) {
            const dx = dot.x - tp.x
            const dy = dot.y - tp.y
            if (dx > -wakeR && dx < wakeR && dy > -wakeR && dy < wakeR) {
              const t = 1 - Math.hypot(dx, dy) / wakeR
              if (t > 0) {
                const fade = (1 - (now - tp.t) / TRAIL_MS) * (fineRipples ? 0.18 : TRAIL_MAX)
                target = Math.max(target, smoothstep(t) * fade)
              }
            }
          }
        }

        target *= pointer.energy

        // ripple wavefronts: brighten near the ring + push outward along it
        for (const ripple of ripples) {
          if (ripple.delay > 0) continue
          const dx = dot.x - ripple.x
          const dy = dot.y - ripple.y
          const d = Math.hypot(dx, dy) || 1
          if (fineRipples) {
            // A moving source stretches its wake along the direction of travel.
            const along = ripple.heading ? dx * ripple.heading.x + dy * ripple.heading.y : 0
            const waveRadius = Math.sqrt(Math.max(0, d * d - 0.44 * along * along))
            const distance = (waveRadius - ripple.r) / 13
            if (Math.abs(distance) > 2.8) continue
            const fade = Math.max(0, 1 - ripple.r / reach) ** 1.4
            const energy = Math.exp(-distance * distance * 0.5) * ripple.strength * fade
            target = Math.min(1.4, target + energy)
            const displacement = (dx || dy) ? 5 * distance * energy / d : 0
            ox += dx * displacement
            oy += dy * displacement
            continue
          }

          const wave = Math.max(0, 1 - Math.abs(d - ripple.r) / WAVE_BAND) * ripple.strength
          if (wave > 0) {
            target = Math.min(1.4, target + wave)
            ox += (dx / d) * wave * WAVE_PUSH
            oy += (dy / d) * wave * WAVE_PUSH
          }
        }

        target *= dot.waveGain
        ox *= dot.waveGain
        oy *= dot.waveGain

        // per-dot clock: quick to swell, slow to settle — water, not a mask
        const tau = fineRipples ? (target > dot.b ? 32 : 75) : (target > dot.b ? SWELL_TAU : SETTLE_TAU)
        dot.b += (target - dot.b) * (1 - Math.exp(-dt / tau))
        if (dot.b < 0.004) dot.b = 0
        else if (dot.b > 0.012) active++

        if (dot.b <= 0.004) {
          ctx.moveTo(dot.x + cr, dot.y)
          ctx.arc(dot.x, dot.y, cr, 0, Math.PI * 2)
        } else {
          lit.push({ dot, ox, oy })
        }
      }

      ctx.fillStyle = baseStyle
      ctx.fill()

      // boosted dots each need their own color/radius
      for (const { dot, ox, oy } of lit) {
        const k = Math.min(1, dot.b)
        const r = Math.round(base[0] + (accent[0] - base[0]) * k)
        const g = Math.round(base[1] + (accent[1] - base[1]) * k)
        const b = Math.round(base[2] + (accent[2] - base[2]) * k)
        const a = alpha + (1 - alpha) * k
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.beginPath()
        ctx.arc(dot.x + ox, dot.y + oy, cr * (1 + (fineRipples ? 0.72 : 2.2) * dot.b), 0, Math.PI * 2)
        ctx.fill()
      }

      return active
    }

    const tick = (now: number) => {
      const dt = lastTime ? Math.min(now - lastTime, 50) : 16
      lastTime = now
      const active = draw(dt, now)

      // The default effect pulses at rest. The hero lets the water settle.
      if (!fineRipples && pointer.inside && pointer.speed < 0.15 && now - lastAuto > AUTO_RIPPLE_MS && ripples.length < 8) {
        ripples.push({ x: pointer.x, y: pointer.y, r: 4, delay: 0, strength: AUTO_RIPPLE_STRENGTH })
        lastAuto = now
      }

      const busy =
        active > 0 ||
        ripples.length > 0 ||
        (fineRipples ? pointer.energy > 0.005 : pointer.inside ? pointer.energy < 0.995 : pointer.energy > 0.005) ||
        Math.abs(pointer.tx - pointer.x) > 0.3 ||
        Math.abs(pointer.ty - pointer.y) > 0.3
      if (busy && onscreen) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const wake = () => {
      if (!running && !reduced && onscreen) {
        running = true
        lastTime = 0
        raf = requestAnimationFrame(tick)
      }
    }

    // raw pointer history for the velocity estimate
    let lastRawX = 0
    let lastRawY = 0
    let lastAuto = 0
    let lastWake: TrailPoint | undefined

    const onMove = (e: PointerEvent) => {
      const p = localPoint(e.clientX, e.clientY)
      const now = performance.now()
      // velocity estimate from raw deltas (px/ms), smoothed
      const dx = p.x - lastRawX
      const dy = p.y - lastRawY
      const movement = Math.hypot(dx, dy)
      const dtp = now - (lastRawT || now - 8)
      const speed = lastRawT && dtp > 0 ? movement / dtp : 0
      if (dtp > 0 && lastRawT) {
        const v = Math.min(speed, 4)
        pointer.speed += (v - pointer.speed) * 0.35
      }
      lastRawX = p.x
      lastRawY = p.y
      lastRawT = now
      pointer.tx = p.x
      pointer.ty = p.y
      const overCanvas = p.x >= 0 && p.x <= w && p.y >= 0 && p.y <= h
      pointer.inside = overCanvas && waveGainAt(p.x, p.y) > 0
      if (fineRipples && pointer.inside && e.pointerType !== 'touch' && speed > 0.12 && movement >= 2) {
        const spaced = !lastWake || (now - lastWake.t >= 75 && Math.hypot(p.x - lastWake.x, p.y - lastWake.y) >= 32)
        if (spaced) {
          ripples.push({
            x: p.x,
            y: p.y,
            r: 7,
            delay: 0,
            strength: Math.min(0.56, 0.2 + pointer.speed * 0.24) * waveGainAt(p.x, p.y),
            heading: { x: dx / movement, y: dy / movement },
          })
          if (ripples.length > 10) ripples.shift()
          lastWake = { ...p, t: now }
        }
      }

      // raw positions make the wake follow the true path, not the eased one
      const last = trail[trail.length - 1]
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 5) {
        trail.push({ x: p.x, y: p.y, t: now })
        if (trail.length > 18) trail.shift()
      }
      wake()
    }

    const onLeave = () => {
      pointer.inside = false
      wake()
    }

    const onDown = (e: PointerEvent) => {
      if (reduced) return
      const p = localPoint(e.clientX, e.clientY)
      if (p.x < -40 || p.x > w + 40 || p.y < -40 || p.y > h + 40 || waveGainAt(p.x, p.y) === 0) return
      // primary ring, then a softer echo — reads as a stone dropped in water
      ripples.push({ x: p.x, y: p.y, r: 6, delay: 0, strength: 1 })
      ripples.push({ x: p.x, y: p.y, r: 2, delay: 140, strength: 0.45 })
      if (ripples.length > 6) ripples.splice(0, ripples.length - 6)
      wake()
    }

    rebuild()
    draw(16, performance.now())

    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
      const io = new IntersectionObserver(
        ([entry]) => {
          onscreen = entry.isIntersecting
          if (onscreen) wake()
        },
        { rootMargin: '80px' },
      )
      io.observe(canvas)
      const ro = new ResizeObserver(() => {
        rebuild()
        draw(16, performance.now())
      })
      ro.observe(canvas)
      return () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerdown', onDown)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        io.disconnect()
        ro.disconnect()
        cancelAnimationFrame(raf)
      }
    }
  }, [width, height, cr, tone, alpha, fineRipples])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  )
}
