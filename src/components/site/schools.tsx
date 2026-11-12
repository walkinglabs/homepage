import { useLocale } from '@/lib/locale'
import { useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { NO_ANIM } from '@/lib/no-anim'
import { publicAsset } from '@/lib/utils'
import './schools.css'

type CommunityMark = {
  name: string
  category: 'university' | 'company'
  image?: string
  shortName?: string
  wordmark?: string
  credit: string
  evidence?: string
}

const logos = publicAsset('media/community-logos')

const marks: CommunityMark[] = [
  {
    name: 'Tsinghua University',
    wordmark: logos + '/tsinghua-word.jpg',
    category: 'university',
    image: publicAsset('media/schools/tsinghua.png'),
    credit: 'A contributor from Tsinghua revised the decoding chapter',
  },
  {
    name: 'ModelScope',
    wordmark: logos + '/modelscope-word.png',
    category: 'company',
    image: logos + '/modelscope.png',
    credit: 'Partner for the online reinforcement learning labs',
  },
  {
    name: 'University of Wisconsin–Madison',
    wordmark: logos + '/uw-horizontal.svg',
    category: 'university',
    image: logos + '/uw-madison.png',
    credit: 'The AI-Assisted Software Development course lists WalkingLabs as supplemental reading',
    evidence: 'https://aicoding.cs.wisc.edu/fa26/schedule.html',
  },
  {
    name: 'Microsoft',
    category: 'company',
    image: logos + '/microsoft.png',
    credit: 'The DevSquad Copilot project cites Awesome Harness Engineering as a design reference',
    evidence: 'https://github.com/microsoft/devsquad-copilot',
  },
  {
    name: 'Shanghai Jiao Tong University',
    wordmark: logos + '/sjtu-lockup.png',
    category: 'university',
    image: logos + '/sjtu.png',
    credit: 'A contributor from Shanghai Jiao Tong University improved the CartPole notebook',
  },
  {
    name: 'IBM',
    image: logos + '/ibm.png',
    category: 'company',
    credit: 'An IBM engineer contributed a build-along harness write-up',
  },
  {
    name: 'The Hong Kong University of Science and Technology',
    category: 'university',
    image: logos + '/hkust.svg',
    credit: 'Contributors from HKUST added veRL-Omni and Uni-CLI',
  },
  {
    name: 'Databricks',
    wordmark: logos + '/databricks-word.svg',
    image: logos + '/databricks.svg',
    category: 'company',
    credit: "A learner from Databricks shared how he uses the course's progress logs and feature lists",
  },
  {
    name: 'The University of British Columbia',
    image: logos + '/ubc.png',
    wordmark: logos + '/ubc-word.png',
    category: 'university',
    shortName: 'UBC',
    credit: 'A contributor from UBC added the ClawBench and WebsiteBench references',
  },
  {
    name: 'ShanghaiTech University',
    category: 'university',
    image: logos + '/shanghaitech.svg',
    credit: 'A contributor from ShanghaiTech revised the Q-learning and SARSA chapter',
  },
  {
    name: 'AMD',
    category: 'company',
    image: logos + '/amd.jpg',
    credit: 'Computing partner for Hands-On Modern RL',
  },
  {
    name: 'University of Pennsylvania',
    image: logos + '/penn.png',
    category: 'university',
    shortName: 'Penn',
    credit: 'A Penn student corrected the rLLM–FinQA reproduction commands',
  },
  {
    name: 'Alibaba Cloud',
    category: 'company',
    image: logos + '/alibaba-cloud.svg',
    credit: 'A contributor from Alibaba Cloud added EPUB builds for Hands-On Modern RL',
  },
  {
    name: 'The Chinese University of Hong Kong',
    category: 'university',
    image: publicAsset('media/schools/cuhk.png'),
    credit: 'A contributor from CUHK fixed the reinforcement learning training logs',
  },
  {
    name: 'Siemens EDA',
    category: 'company',
    image: logos + '/siemens.png',
    credit: 'A contributor from Siemens EDA improved the Harness Engineering project instructions',
  },
  {
    name: 'University of Hong Kong',
    wordmark: logos + '/hku-word.svg',
    category: 'university',
    image: publicAsset('media/schools/hku.png'),
    credit: 'Learners in the WalkingLabs community',
  },
  {
    name: 'OpenHands',
    category: 'company',
    image: logos + '/openhands.svg',
    credit: 'An OpenHands engineer used the WalkingLabs project structure in a public hands-on course',
  },
  {
    name: 'LINE Thailand',
    category: 'company',
    image: publicAsset('media/schools/line-thailand.jpg'),
    credit: 'Proposed community workshop',
  },
  {
    name: 'University of Auckland',
    wordmark: logos + '/auckland-word.svg',
    category: 'university',
    image: logos + '/auckland.svg',
    credit: 'A contributor from the University of Auckland improved the CartPole lab',
  },
]

function MarkArtwork({ mark, className, alt = '' }: { mark: CommunityMark; className: string; alt?: string }) {
  if (mark.image) {
    return <img className={className} src={mark.image} alt={alt} decoding="async" />
  }

  return <span className="school-logo-name">{mark.shortName ?? mark.name}</span>
}

function RailArtwork({ mark }: { mark: CommunityMark }) {
  const source = mark.wordmark ?? mark.image
  return source ? <img className="school-logo-image" src={source} alt="" decoding="async" /> : null
}

function LogoFlow({ entries, direction }: { entries: CommunityMark[]; direction: 'left' | 'right' }) {
  const renderMarks = (copy = false) => entries.map((mark) => {
    const label = mark.name + ' · ' + mark.credit

    return (
      <li key={mark.name} className="school-logo-lane">
        {mark.evidence ? (
          <a
            href={mark.evidence}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            tabIndex={copy ? -1 : undefined}
            title={label}
            className="school-logo-mark rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand"
          >
            <RailArtwork mark={mark} />
          </a>
        ) : (
          <div className="school-logo-mark" aria-label={label} role="img" title={label}>
            <RailArtwork mark={mark} />
          </div>
        )}
      </li>
    )
  })

  return (
    <div
      className="school-logo-flow mt-2"
      data-static={NO_ANIM || undefined}
      data-direction={direction}
      style={{ '--logo-count': entries.length } as CSSProperties}
    >
      <div className="school-logo-track">
        <ul className="school-logo-group">{renderMarks()}</ul>
        {!NO_ANIM && (
          <ul className="school-logo-group school-logo-copy" aria-hidden="true">
            {renderMarks(true)}
          </ul>
        )}
      </div>
    </div>
  )
}

function ContributorGroup({ category, title }: { category: CommunityMark['category']; title: string }) {
  const { t } = useLocale()
  const entries = marks
    .filter((mark) => mark.category === category)
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))

  return (
    <section aria-labelledby={'contributors-' + category}>
      <h3 id={'contributors-' + category} className="mb-2 text-sm font-semibold">{t(title)}</h3>
      <ul className="divide-y divide-border border-y border-border">
        {entries.map((mark) => {
          const contents = (
            <>
              <span className="flex h-8 w-14 shrink-0 items-center justify-center" aria-hidden="true">
                {(mark.image || mark.shortName) && (
                  <MarkArtwork mark={mark} className="max-h-7 max-w-full object-contain" />
                )}
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium">{t(mark.name)}</span>
            </>
          )
          const rowClass = 'flex min-h-12 items-center gap-3 px-2 py-2'

          return (
            <li key={mark.name}>
              {mark.evidence ? (
                <a
                  href={mark.evidence}
                  target="_blank"
                  rel="noreferrer"
                  className={rowClass + ' transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand'}
                >
                  {contents}
                </a>
              ) : (
                <div className={rowClass}>{contents}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function SchoolWall() {
  const { t } = useLocale()
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="learners" aria-labelledby="learner-logos-title" className="border-b border-border bg-background">
      <div className="shell py-5">
        <h2 id="learner-logos-title" className="kicker text-center">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="learner-directory"
            onClick={() => setExpanded(!expanded)}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm px-2 py-1 text-center uppercase transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
          >
            {t("Learners & collaborators from", "学员与协作者来自")}
            <ChevronDown
              className="size-3.5 shrink-0 group-aria-expanded:rotate-180 motion-safe:transition-transform"
              aria-hidden="true"
            />
          </button>
        </h2>

        {!expanded && (
          <div className="mt-3 grid gap-1.5">
            <LogoFlow entries={marks.slice(0, Math.ceil(marks.length / 2))} direction="right" />
            <LogoFlow entries={marks.slice(Math.ceil(marks.length / 2))} direction="left" />
          </div>
        )}
        <div id="learner-directory" hidden={!expanded} className="mt-4 border-t border-border pt-4">
          {expanded && (
            <>
              <p className="mb-6 text-center text-[13px] leading-relaxed text-muted-foreground">
                {t("Thank you to everyone who has contributed to WalkingLabs, used our courses, or supported our work.", "感谢每一位为 WalkingLabs 作出贡献、使用课程或支持我们的人。")}
              </p>
              <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
                <ContributorGroup category="university" title="Universities" />
                <ContributorGroup category="company" title="Companies" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
