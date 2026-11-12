import type { ReactNode } from 'react'
import { BlurFade } from '@/components/ui/blur-fade'
import { NO_ANIM } from '@/lib/no-anim'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** reveal only when scrolled into view (default: on mount) */
  inView?: boolean
}

/**
 * Thin wrapper over Magic UI's BlurFade that honours ?noanim so the page can be
 * screenshotted / crawled without waiting for scroll-triggered motion.
 */
export function Reveal({ children, className, delay = 0, inView = false }: RevealProps) {
  if (NO_ANIM) return <div className={cn(className)}>{children}</div>

  return (
    <BlurFade
      className={className}
      delay={delay}
      duration={0.55}
      offset={12}
      direction="up"
      blur="8px"
      inView={inView}
    >
      {children}
    </BlurFade>
  )
}
