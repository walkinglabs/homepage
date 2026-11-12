import { Marquee } from '@/components/ui/marquee'
import { tickerItems } from '@/data/site'

export function Ticker() {
  return (
    <section aria-label="Experiment topics" className="relative border-b border-border bg-background">
      <Marquee className="[--duration:52s] [--gap:2.5rem] py-0" pauseOnHover repeat={2}>
        {tickerItems.map((name) => (
          <div key={name} className="flex items-center gap-2.5 py-3.5 whitespace-nowrap">
            <span className="font-mono text-[11.5px] text-foreground/75">{name}</span>
            <span aria-hidden className="text-[10px] text-muted-foreground/50">
              ·
            </span>
          </div>
        ))}
      </Marquee>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: 'linear-gradient(90deg, var(--background), transparent)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: 'linear-gradient(270deg, var(--background), transparent)' }}
      />
    </section>
  )
}
