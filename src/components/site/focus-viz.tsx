import { useRef, type ReactNode } from 'react'
import { Check, FileCode2, Globe, Sparkles, Wrench } from 'lucide-react'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'
import { cn } from '@/lib/utils'

function Node({
  ref,
  children,
  className,
}: {
  ref?: React.RefObject<HTMLDivElement | null>
  children: ReactNode
  className?: string
}) {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5 text-[10.5px] font-medium shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** AnimatedBeam graph — how a task travels through an agent harness. */
export function BeamViz() {
  const container = useRef<HTMLDivElement>(null)
  const task = useRef<HTMLDivElement>(null)
  const repo = useRef<HTMLDivElement>(null)
  const tools = useRef<HTMLDivElement>(null)
  const done = useRef<HTMLDivElement>(null)

  const beam = {
    containerRef: container,
    pathColor: '#cbd6cf',
    pathWidth: 1.2,
    pathOpacity: 0.55,
    gradientStartColor: '#8241b5',
    gradientStopColor: '#c9a6e8',
    duration: 3.4,
  }

  return (
    <div ref={container} className="absolute left-1/2 top-5 h-[34%] w-[min(70%,420px)] -translate-x-1/2">
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <Node ref={task}>
          <Sparkles className="size-3 text-brand" />
          task
        </Node>
      </div>

      <div className="absolute top-[44%] left-2 -translate-y-1/2">
        <Node ref={repo}>
          <FileCode2 className="size-3 text-muted-foreground" />
          repo
        </Node>
      </div>

      <div className="absolute top-[44%] right-2 -translate-y-1/2">
        <Node ref={tools}>
          <Wrench className="size-3 text-muted-foreground" />
          tools
        </Node>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <Node ref={done}>
          <Check className="size-3 text-brand" strokeWidth={2.6} />
          done
        </Node>
      </div>

      <AnimatedBeam {...beam} fromRef={task} toRef={repo} curvature={-26} />
      <AnimatedBeam {...beam} fromRef={task} toRef={tools} curvature={26} />
      <AnimatedBeam {...beam} fromRef={repo} toRef={done} curvature={-26} delay={0.6} />
      <AnimatedBeam {...beam} fromRef={tools} toRef={done} curvature={26} delay={0.6} />
    </div>
  )
}

/** OrbitingCircles — perception, dynamics, planning and action around one core. */
function Chip({ label }: { label: string }) {
  return (
    <span className="grid size-full place-items-center rounded-full border border-border bg-card text-[9px] font-medium text-muted-foreground">
      {label}
    </span>
  )
}

export function OrbitViz() {
  return (
    <div className="pointer-events-none absolute top-1/2 right-2 hidden size-[210px] -translate-y-1/2 sm:block">
      <div className="relative grid size-full place-items-center">
        <span className="grid size-10 place-items-center rounded-full border border-border bg-card">
          <Globe className="size-4 text-brand" strokeWidth={1.5} />
        </span>

        <OrbitingCircles radius={62} duration={26} iconSize={28}>
          <Chip label="eye" />
          <Chip label="act" />
        </OrbitingCircles>

        <OrbitingCircles radius={92} duration={44} reverse iconSize={26}>
          <Chip label="lat" />
          <Chip label="plan" />
        </OrbitingCircles>
      </div>
    </div>
  )
}
