import { Link } from 'react-router-dom'
import {
  Cloud, Shield, Zap, DollarSign,
  BookOpen, FlaskConical, Brain, Terminal, Network,
  Clock, FileQuestion, CheckCircle, Star, ArrowRight,
  Layers, Target, BarChart3, GraduationCap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CLF_DOMAINS } from '../data/courses/aws/clf/curriculum'

const DOMAIN_DETAILS = {
  'clf-domain-1': {
    icon: Cloud,
    topics: ['6 advantages of cloud computing', 'AWS global infrastructure (Regions, AZs, Edge Locations)', 'Well-Architected Framework (6 pillars)', 'Cloud deployment models (cloud, hybrid, on-premises)', 'AWS Cloud Adoption Framework (CAF)', '7 Rs migration strategies', 'CAPEX vs OPEX and cloud economics'],
    tip: 'The Well-Architected Framework pillars come up often. Know which pillar maps to which concern (e.g. Reliability = recover from failure, Sustainability = environmental impact).',
  },
  'clf-domain-2': {
    icon: Shield,
    topics: ['AWS shared responsibility model', 'IAM users, groups, roles, and policies', 'Root user protection and MFA', 'Principle of least privilege', 'AWS Artifact, AWS Shield, GuardDuty, Inspector', 'Encryption in transit and at rest', 'AWS compliance programs and AWS Config'],
    tip: 'The shared responsibility model is a guaranteed exam topic. Know exactly what AWS manages ("security of the cloud") vs what you manage ("security in the cloud").',
  },
  'clf-domain-3': {
    icon: Zap,
    topics: ['EC2 instance types and purchasing options', 'S3 storage classes and lifecycle policies', 'RDS, Aurora, DynamoDB and ElastiCache', 'VPC, subnets, security groups, NACLs', 'CloudFront, Route 53 and load balancers', 'Lambda and serverless architecture', 'SageMaker, Lex, Kendra and other AI/ML services', 'SQS, SNS and EventBridge'],
    tip: 'This domain is the largest (34%). Focus on being able to identify the right service for a given use case rather than deep technical details.',
  },
  'clf-domain-4': {
    icon: DollarSign,
    topics: ['On-Demand, Reserved, Spot and Savings Plans', 'AWS Free Tier and pricing calculator', 'AWS Budgets, Cost Explorer and Cost and Usage Report', 'Consolidated billing with AWS Organizations', 'AWS Support plans (Basic, Developer, Business, Enterprise)', 'AWS Trusted Advisor and Health Dashboard'],
    tip: 'Know the four support plan tiers and what each includes. Trusted Advisor checks appear frequently in billing/cost questions.',
  },
}

const DOMAIN_COLORS = {
  'clf-domain-1': { bg: 'bg-sky-500/10', border: 'border-sky-500/30', badge: 'bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/30', bar: 'bg-sky-500', accent: 'text-sky-500' },
  'clf-domain-2': { bg: 'bg-violet-500/10', border: 'border-violet-500/30', badge: 'bg-violet-500/20 text-violet-600 dark:text-violet-300 border-violet-500/30', bar: 'bg-violet-500', accent: 'text-violet-500' },
  'clf-domain-3': { bg: 'bg-teal-500/10', border: 'border-teal-500/30', badge: 'bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/30', bar: 'bg-teal-500', accent: 'text-teal-500' },
  'clf-domain-4': { bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/30', bar: 'bg-amber-500', accent: 'text-amber-500' },
}

const FEATURES = [
  { icon: Brain, title: 'Structured Lessons', description: 'Each lesson maps directly to CLF-C02 task statements. No filler, just what the exam actually tests.', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: Network, title: 'Interactive Diagrams', description: 'Visual flow diagrams for global infrastructure, shared responsibility, and service relationships.', color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { icon: FlaskConical, title: 'CLI Simulator', description: 'Practice real AWS CLI commands in a sandboxed environment to build hands-on familiarity.', color: 'text-teal-500', bg: 'bg-teal-500/10' },
  { icon: BookOpen, title: 'Flashcard Decks', description: 'Flip, shuffle, and track mastery for every lesson until every concept sticks.', color: 'text-aws-orange', bg: 'bg-aws-orange/10' },
  { icon: FileQuestion, title: 'Practice Quizzes', description: 'Scenario-based multiple-choice questions in the same style as the real CLF exam.', color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { icon: BarChart3, title: 'Progress Tracking', description: 'Mark lessons complete and track your coverage across all four CLF domains.', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
]

const TIPS = [
  { icon: Target, text: 'CLF is a breadth exam, not a depth exam. You need to know what each service does and when to use it, not how to configure it in detail.' },
  { icon: Layers, text: 'The shared responsibility model is on every version of the exam. Internalize it: AWS manages the cloud infrastructure; you manage everything you put in it.' },
  { icon: Clock, text: '65 questions in 90 minutes gives you about 80 seconds per question. Flag and skip anything uncertain, then return at the end.' },
  { icon: Star, text: 'Many questions ask which service is "most appropriate" for a scenario. Learn service use-case pairings, not service internals.' },
  { icon: GraduationCap, text: 'Use the AWS Services Dictionary to quickly look up any service you are unsure about. Filter it to CLF-C02 to stay focused.' },
]

export default function ClfIntro() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10">

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-5">
          <GraduationCap size={13} />
          AWS Certification Prep Â· CLF-C02
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4 leading-tight">
          Your path to the{' '}
          <span className="text-sky-500">Cloud Practitioner</span>
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
          CLF-C02 covers foundational cloud knowledge across 4 domains. No prior IT experience required. This guide walks through every topic tested, with lessons, flashcards, and practice quizzes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/lessons/clf-cloud-concepts"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white font-semibold text-sm hover:bg-sky-400 transition-colors shadow-sm"
          >
            Start Learning <ArrowRight size={15} />
          </Link>
          <Link
            to="/clf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-gray-700 dark:text-slate-300 font-semibold text-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            View Curriculum
          </Link>
        </div>
      </div>

      {/* Exam at a glance */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-4">Exam at a Glance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: 'Questions', value: '65', sub: '50 scored + 15 unscored' },
            { label: 'Duration', value: '90', sub: 'minutes' },
            { label: 'Passing Score', value: '700', sub: 'out of 1000' },
            { label: 'Domains', value: '4', sub: 'content areas' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-sky-500">{value}</p>
              <p className="text-xs font-semibold text-gray-800 dark:text-slate-200 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5 leading-tight">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1">Multiple Choice</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">One correct response from four options. A scenario describes a situation; pick the best AWS service or approach.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1">Multiple Response</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">Two or more correct responses from five or more options. The question tells you how many to select.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-500/20 flex gap-2.5 items-start">
          <Star size={14} className="text-sky-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-sky-700 dark:text-sky-300 leading-relaxed">
            <span className="font-semibold">Level:</span> CLF-C02 is a Foundational cert. No prior cloud or IT experience is required. It tests awareness of what AWS services do, not how to architect or configure them in depth.
          </p>
        </div>
      </div>

      {/* Domain breakdown */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-1">Exam Domains</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">Four domains weighted by percentage of scored content.</p>

        <div className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 mb-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-4">Weight Distribution</p>
          <div className="space-y-3">
            {CLF_DOMAINS.map((d) => {
              const c = DOMAIN_COLORS[d.id]
              return (
                <div key={d.id} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 w-20 flex-shrink-0">D{d.number} Â· {d.percentage}%</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full', c.bar)} style={{ width: `${d.percentage}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-slate-400 w-36 flex-shrink-0 hidden sm:block truncate">{d.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4">
          {CLF_DOMAINS.map((d) => {
            const c = DOMAIN_COLORS[d.id]
            const det = DOMAIN_DETAILS[d.id]
            const Icon = det.icon
            return (
              <div key={d.id} className={cn('rounded-2xl border p-5 shadow-sm', c.bg, c.border)}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border', c.bg, c.border)}>
                    <Icon size={18} className={c.accent} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100">Domain {d.number}: {d.title}</h3>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full border font-semibold', c.badge)}>{d.percentage}%</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{d.lessons.length} lessons</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {det.topics.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-700 text-gray-600 dark:text-slate-400">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2 items-start px-3 py-2.5 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-gray-200/60 dark:border-slate-700/60">
                  <Star size={12} className={cn('flex-shrink-0 mt-0.5', c.accent)} />
                  <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">{det.tip}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-1">How This Guide Is Structured</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">Every CLF lesson uses the same set of interactive learning components.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map(({ icon: Icon, title, description, color, bg }) => (
            <div key={title} className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', bg)}>
                <Icon size={17} className={color} />
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1">{title}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum outline */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-1">Curriculum Outline</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">Lessons follow the domain order from the official CLF-C02 exam guide.</p>
        <div className="grid gap-3">
          {CLF_DOMAINS.map((d) => {
            const c = DOMAIN_COLORS[d.id]
            const available = d.lessons.filter((l) => l.available)
            const locked = d.lessons.filter((l) => !l.available)
            return (
              <div key={d.id} className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className={cn('flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-slate-800', c.bg)}>
                  <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border', c.bg, c.border, c.accent)}>{d.number}</div>
                  <p className="text-xs font-bold text-gray-900 dark:text-slate-100 flex-1 truncate">{d.title}</p>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full border font-semibold flex-shrink-0', c.badge)}>{d.percentage}%</span>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-slate-800/60">
                  {d.lessons.map((lesson) => (
                    <div key={lesson.id} className={cn('flex items-center gap-3 px-4 py-2.5', !lesson.available && 'opacity-50')}>
                      {lesson.available
                        ? <CheckCircle size={12} className="text-emerald-500 flex-shrink-0" />
                        : <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-slate-600 flex-shrink-0" />}
                      <span className="flex-1 text-xs text-gray-700 dark:text-slate-300 truncate">{lesson.title}</span>
                      <span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0">{lesson.duration}</span>
                      {lesson.available && (
                        <Link to={`/lessons/${lesson.id}`} className="text-xs text-sky-500 hover:underline flex-shrink-0">Open</Link>
                      )}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 dark:border-slate-800 flex gap-4">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">{available.length} available</span>
                  <span className="text-xs text-gray-400 dark:text-slate-500">{locked.length} coming soon</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Study tips */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-5">Study Tips</h2>
        <div className="space-y-3">
          {TIPS.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex gap-3 items-start bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3.5 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-sky-500" />
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-sky-500/15 to-sky-500/5 border border-sky-500/25 p-6 text-center shadow-sm">
        <p className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Ready to start?</p>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">Begin with Cloud Concepts, the first domain and the foundation for the entire CLF-C02 exam.</p>
        <Link
          to="/lessons/clf-cloud-concepts"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-400 transition-colors shadow-sm"
        >
          Open Lesson 1: Cloud Concepts <ArrowRight size={15} />
        </Link>
      </div>

    </div>
  )
}

