import type { ComponentType, FC } from 'react'
import { ArrowUpRight as ArrowUpRightIcon, BadgeCheck, Star } from 'lucide-react'
import { cn, publicAsset } from '@/lib/utils'

/* ------------------------------------------------------------
   Icon shell: normalizes every icon to the same component API
   (<Icon className="..." />) so callers never care about the
   underlying source (lucide, brand marks, custom marks).
   ------------------------------------------------------------ */
export type IconComponent = ComponentType<{ className?: string }>

function icon(Icon: FC<{ className?: string }>): IconComponent {
  return function Mark({ className }) {
    return <Icon className={className} />
  }
}

/* ---------- lucide-backed icons ---------- */

export const ArrowUpRight = icon(ArrowUpRightIcon)

export const StarMark = icon(function StarMark({ className }) {
  return <Star className={cn('fill-current stroke-none', className)} />
})

export const VerifiedMark = icon(function VerifiedMark({ className }) {
  return <BadgeCheck className={cn('fill-[#1D9BF0] text-white', className)} />
})

/* ---------- brand marks (not available in lucide) ---------- */

export function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('fill-current', className)}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  )
}

export function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('fill-current', className)}>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z" />
    </svg>
  )
}

export function DiscordMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('fill-current', className)}>
      <path d="M20.3 4.5A17.7 17.7 0 0 0 15.9 3.1l-.3.6a13.3 13.3 0 0 1 3.6 1.9 15.5 15.5 0 0 0-14.4 0 13.6 13.6 0 0 1 3.6-1.9l-.3-.6A17.7 17.7 0 0 0 3.7 4.5 18.9 18.9 0 0 0 .2 17.1a17.9 17.9 0 0 0 5.4 2.7l.7-1.2a11.4 11.4 0 0 1-1.8-.9l.5-.4a12.7 12.7 0 0 0 10.9 0l.5.4a11.6 11.6 0 0 1-1.8.9l.7 1.2a17.9 17.9 0 0 0 5.4-2.7 18.9 18.9 0 0 0-3.4-12.6zM8.3 14.7c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1zm7.4 0c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1z" />
    </svg>
  )
}

/* ---------- logotype ---------- */

/* The official lockup, taken byte-for-byte from walkinglabs/homepage
   (src/assets/logo.svg): the gradient "W" stands in for the first letter,
   and the dot over the i is a four-point star. Do not redraw it or re-set
   the wordmark in a local typeface — the artwork carries its own lettering.
   The wordmark alone (public/brand/mark.svg) is only used to build the
   square favicon. */
export function Lockup({ className }: { className?: string }) {
  return (
    <img
      src={publicAsset('brand/logo.svg')}
      alt="WalkingLabs"
      width={1055}
      height={159}
      className={cn('block h-[22px] w-auto', className)}
    />
  )
}
