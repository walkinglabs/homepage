import { LocaleProvider } from '@/lib/locale'
import { MotionConfig } from 'motion/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Nav } from '@/components/site/nav'
import { Hero } from '@/components/site/hero'
import { SchoolWall } from '@/components/site/schools'
import { About } from '@/components/site/about'
import { FocusBento } from '@/components/site/focus-bento'
import { Projects } from '@/components/site/projects'
import { Method } from '@/components/site/method'
import { Community } from '@/components/site/community'
import { Voices } from '@/components/site/voices'
import { Faq } from '@/components/site/faq'
import { FinalCta } from '@/components/site/final-cta'
import { Footer } from '@/components/site/footer'

export default function App() {
  // ?noanim — render everything in its final state (QA / screenshots / crawlers)
  const noAnim = new URLSearchParams(window.location.search).has('noanim')
  // ?y=1800 — shift the page up for section captures (screenshot helper only)
  const y = Number(new URLSearchParams(window.location.search).get('y') ?? 0)

  return (
    <MotionConfig reducedMotion={noAnim ? 'always' : 'user'}>
      <TooltipProvider delayDuration={120}>
        <LocaleProvider>
          <div
            id="top"
            className="grain min-h-screen bg-background text-foreground"
            style={y ? { marginTop: -y } : undefined}
          >
            <Nav />
            <main>
              <Hero />
              <SchoolWall />
              <About />
              <FocusBento />
              <Projects />
              <Method />
              <Community />
              <div className="bg-muted/30">
                <Voices />
                <Faq />
              </div>
              <FinalCta />
            </main>
            <Footer />
          </div>
        </LocaleProvider>
      </TooltipProvider>
    </MotionConfig>
  )
}
