# AWS Certification Study Guide — Project Context

## Purpose
React + Vite multi-cert study website. Covers SAA-C03, CLF-C02, and (planned) AIF-C01.
Lessons built one at a time for content accuracy. Always verify facts against AWS docs.

## Hard Rules — NEVER BREAK THESE
- **NO EM DASHES (—) anywhere in the codebase.** Use a colon, comma, semicolon, or period instead. This applies to lesson content, UI copy, callouts, scenario text, table rows, comments — everywhere. If you catch an existing em dash, replace it.
- **No emoji in lesson prose or UI copy** unless the user explicitly requests it.

## Content Accuracy — REQUIRED
- Consult https://docs.aws.amazon.com/ before adding facts. Verify limits, defaults, behaviors.
- Keep lessons exam-relevant. Use official exam guides as source of truth.
- `docs/exam-guide.txt` — SAA-C03 official exam guide.
- Updated for 2026.

## Tech Stack
- React 18 + Vite 6, React Router v6
- Tailwind CSS v3 (`darkMode: 'class'` — dark by default)
- **shadcn/ui** (base-nova style, no tsx) — component library on top of Tailwind + Base UI primitives
- `@xyflow/react` (React Flow v12) for diagrams, Lucide React icons, Framer Motion
- Real AWS SVG icons in `src/assets/aws-icons/` mapped via `ICON_MAP` in `ServiceIcon.jsx`
- Vercel deployment

## shadcn Setup
- `components.json` — style: base-nova, rsc: false, tsx: false, alias `@` → `src/`
- `src/lib/utils.js` — exports `cn()` (use instead of `clsx` everywhere)
- `tailwind.config.js` — CSS variable colors wired: `bg-background`, `text-foreground`, `bg-primary`, `border-border`, etc.
- `src/index.css` — CSS variables for light (`--background: 36 28% 93%`) and dark (`--background: 218 40% 7%`) modes. Primary = AWS orange (`37 100% 50%`).
- `TooltipProvider` wraps app in `src/main.jsx`
- **Available components:** `Button`, `Card`, `Badge`, `Tabs`, `Table`, `Progress`, `Separator`, `Alert`, `Accordion`, `Tooltip`
- `Progress` uses Base UI — import `{ Progress }` from `@/components/ui/progress`; use CSS overrides for color: `[&_[data-slot=progress-indicator]]:bg-aws-orange`
- `Button` variants: `default` (orange), `outline`, `secondary`, `ghost`, `destructive`, `link`
- `Button` sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`
- **Do NOT use `@apply` with CSS-variable-based classes in `@layer base`** — use raw CSS (`hsl(var(--border))`) instead
- `tailwindcss-animate` loaded via ESM import (not `require`) in `tailwind.config.js`

## Routing
| Route | Page | Notes |
|-------|------|-------|
| `/` | `CertPicker` | Full-screen, NO sidebar or header |
| `/saa` | `Home` | SAA-C03 curriculum home |
| `/clf` | `ClfHome` | CLF-C02 curriculum home |
| `/intro` | `Intro` | SAA-C03 exam introduction |
| `/clf/intro` | `ClfIntro` | CLF-C02 exam introduction |
| `/lessons/:lessonId` | `LessonPage` | All certs share this route |
| `/dictionary` | `Dictionary` | `?cert=clf` filters to CLF services; `?focus=<id>` opens a service |

**Active cert detection** (`getActiveCert(pathname, search)` in `App.jsx`):
- `/clf`, `/clf/*`, `/lessons/clf-*` → `'clf'`
- `?cert=clf` query param → `'clf'` (fallback for cert-agnostic pages like `/dictionary`)
- Default → `'saa'`

## Multi-Cert Architecture
- `src/data/curriculum.js` — SAA-C03: 32 lessons, 4 domains. `getLessonMeta(id)` searches SAA then falls back to CLF.
- `src/data/clf-curriculum.js` — CLF-C02: 11 lessons, 4 domains. Exports `CLF_DOMAINS`, `CLF_TOTAL_LESSONS`, `getClfLessonMeta(id)`.
- `src/data/cert-services.js` — `CLF_SERVICE_IDS` set (~50 services). `isClfService(id)` helper.
- Lesson IDs are namespaced: SAA lessons use plain IDs (`iam`, `ec2`), CLF lessons use `clf-` prefix (`clf-cloud-concepts`).
- `lessonMeta.cert` is `'saa'` or `'clf'` — available in `LessonPage` for cert-specific behavior.

## Adding a New SAA Lesson
1. Create `src/data/lessons/{lessonId}.jsx`
2. Register in `src/data/lessons/index.js`
3. Set `available: true` in `src/data/curriculum.js`

## Adding a New CLF Lesson
1. Create `src/data/lessons/clf-{lessonId}.jsx` (prefix with `clf-`)
2. Register in `src/data/lessons/index.js`
3. Set `available: true` in `src/data/clf-curriculum.js`

## Key Files
| File | Purpose |
|------|---------|
| `src/data/curriculum.js` | SAA-C03: 32 lessons, 4 domains. `getLessonMeta()` searches SAA then CLF. |
| `src/data/clf-curriculum.js` | CLF-C02: 11 lessons, 4 domains. `getClfLessonMeta()`. |
| `src/data/cert-services.js` | `CLF_SERVICE_IDS` set for dictionary filtering. |
| `src/data/lessons/index.js` | Registry: lessonId → { Content, flashcards, quiz, meta } |
| `src/data/lessons/{id}.jsx` | Individual lesson files |
| `src/data/awsServices.js` | Service definitions used by Dictionary and ServiceIcon |
| `src/App.jsx` | Routes + `getActiveCert(pathname, search)` → passes `activeCert` to Sidebar |
| `src/components/Sidebar.jsx` | Always dark. Accepts `isOpen`, `onClose`, `activeCert`. Shows cert-specific domains + progress. Logo → `/`. |
| `src/components/Header.jsx` | `PanelLeft` sidebar toggle. Cert-aware breadcrumb. Home icon → `/`. |
| `src/pages/CertPicker.jsx` | Full-screen cert selection. Three cert cards (CLF, AIF coming soon, SAA). |
| `src/pages/Home.jsx` | SAA-C03 curriculum home at `/saa`. |
| `src/pages/ClfHome.jsx` | CLF-C02 curriculum home at `/clf`. |
| `src/pages/Intro.jsx` | SAA-C03 exam introduction at `/intro`. |
| `src/pages/ClfIntro.jsx` | CLF-C02 exam introduction at `/clf/intro`. |
| `src/pages/Dictionary.jsx` | `?cert=clf` tab filters to CLF services. `?focus=<id>` auto-expands a service. |
| `src/components/FlowDiagram.jsx` | **Primary diagram.** Props: `nodes`, `edges`, `legend`, `caption`, `height`. |
| `src/components/CliSimulator.jsx` | AWS CLI lab. Props: `exercises[]` with `{task,command,accept[],output[],hint,successNote}`. |
| `src/components/ServiceIcon.jsx` | `ICON_MAP`, `ServiceGrid({ services, cert })`, `ServiceTagList`. ServiceGrid passes `?cert=` to dictionary links. |
| `src/components/Callout.jsx` | Types: `note`, `warning`, `tip`, `important`, `examTip`. Uses `cn()`. |
| `src/components/ComparisonTable.jsx` | shadcn Table. Props: `title`, `headers[]`, `rows[][]`. |
| `src/components/FlashcardDeck.jsx` | shadcn Button, Badge, Progress. |
| `src/components/QuizBlock.jsx` | shadcn Button, Progress. |
| `src/components/AnimatedPolicyFlow.jsx` | 7-step IAM policy eval animation. |
| `docs/exam-guide.txt` | SAA-C03 official exam guide. |

## FlowDiagram — Rules
- Uses `useNodesState`/`useEdgesState` from `@xyflow/react` (must stay in same component as `<ReactFlow>`)
- **DO NOT split FlowCanvas into a child component** — breaks edge rendering
- **DO NOT wrap in `ReactFlowProvider`** — causes edge rendering failure
- Edge type: `'default'` (bezier curves). All edges must specify `sourceHandle` and `targetHandle`.
- Handle IDs: `ts/tt` (top source/target), `rs/rt` (right), `bs/bt` (bottom), `ls/lt` (left)
- Node types: `lucide`, `awsService`, `concept`
- Lucide icon names (confirmed): User, Users, Shield, ShieldAlert, Key, KeyRound, Server, Archive, Search, Building2, Code, Globe, Database, Lock, FileText, FilePen, FileCheck, FileX, Layers, Settings, Bell, CheckCircle, XCircle, AlertTriangle, Info, Zap, Cloud, Network, Box
- Node labels: NO emojis, NO `\n` newlines — use `sublabel` field for secondary text

## Lesson Template (minimal)
```jsx
import Callout from '../../components/Callout'
import FlowDiagram from '../../components/FlowDiagram'
import ComparisonTable from '../../components/ComparisonTable'
import FlashcardDeck from '../../components/FlashcardDeck'
import QuizBlock from '../../components/QuizBlock'
import CliSimulator from '../../components/CliSimulator'

export const meta = { description: '...', services: ['S3'] }
export const flashcards = [{ front: '', back: '' }]
export const quiz = [{ question: '', options: [], answer: 0, explanation: '' }]
export function Content() {
  return (
    <>
      <h2>...</h2>
      {/* CLI Lab */}
      <div className="mt-10 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">CLI Lab</h2>
        <CliSimulator exercises={[]} />
      </div>
      {/* Flashcards */}
      <div className="mt-10 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">Flashcards</h2>
        <FlashcardDeck cards={flashcards} />
      </div>
      {/* Quiz */}
      <div className="mt-4 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">Practice Quiz</h2>
        <QuizBlock questions={quiz} />
      </div>
    </>
  )
}
```

## Design System
- AWS orange: `text-aws-orange` / `bg-aws-orange` (#FF9900) — also maps to `text-primary` / `bg-primary`
- AWS dark navy: `aws-dark` (#232F3E)
- Callout types: `note` (blue), `warning` (yellow), `tip` (green), `important` (orange), `examTip` (purple)
- Light theme body: warm parchment `#F0ECE4` — NOT pure white. Cards use `bg-white/80` with `shadow-sm`.
- Dark theme body: deep navy `#080d13`
- Sidebar: **always dark** `#0d1117` — no light mode variant. Closable via X button or `PanelLeft` toggle in header.
- SAA domain card tints (light): D1=`bg-red-50/80`, D2=`bg-blue-50/80`, D3=`bg-emerald-50/80`, D4=`bg-amber-50/80`
- CLF domain card tints (light): D1=`bg-sky-50/80`, D2=`bg-violet-50/80`, D3=`bg-teal-50/80`, D4=`bg-amber-50/80`
- Lesson header gradient: SAA domain colors (red/blue/emerald/amber), CLF domain colors (sky/violet/teal/amber)
- ServiceTagList badges: `text-white` with `color+'40'` background (NOT category color text)
- SAA domain colors: D1=red, D2=blue, D3=emerald, D4=amber
- CLF domain colors: D1=sky, D2=violet, D3=teal, D4=amber
- Use `cn()` from `@/lib/utils` (not `clsx`) in all components
- **NO EM DASHES EVER** — use colons, commas, semicolons, or periods instead
- Header (`Header.jsx`): always `bg-[#232F3E]` dark navy, never changes with light/dark mode. Active cert pill uses `bg-[#FF9900] text-[#232F3E]`.
- FlowDiagram canvas: always white (`bg-white`). Nodes are colored solid squares (AWS architecture diagram style) with white icons. Edges use `#64748b` unless explicitly overridden per-edge.

## Cert Badge Images
- CLF-C02: `https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png`
- AIF-C01: `https://images.credly.com/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png`
- SAA-C03: `src/assets/saa-badge.png` (local)

## Completed Lessons

### SAA-C03
- ✅ `iam` — IAM Fundamentals (domain-1)
- ✅ `iam-advanced` — IAM Advanced, Organizations & Control Tower (domain-1)

### CLF-C02
- ✅ `clf-cloud-concepts` — Cloud Concepts, WAF & Cloud Economics (clf-domain-1)

## SAA-C03 Curriculum (32 lessons)
**Domain 1 — Secure Architectures (30%)**
iam ✅ | iam-advanced ✅ | s3-security | vpc-security | waf-shield | kms | secrets-manager | cognito | security-services

**Domain 2 — Resilient Architectures (26%)**
ec2 | auto-scaling | elb | rds-aurora | dynamodb | route53 | disaster-recovery | s3-resilience | decoupling

**Domain 3 — High-Performing Architectures (24%)**
ec2-advanced | ebs-efs-fsx | lambda-serverless | containers | elasticache | vpc-networking | cloudfront-ga | data-streaming | analytics

**Domain 4 — Cost-Optimized Architectures (20%)**
ec2-pricing | s3-storage-classes | migration-transfer | observability | cost-management

## CLF-C02 Curriculum (11 lessons)
**Domain 1 — Cloud Concepts (24%)**
clf-cloud-concepts ✅ | clf-migration

**Domain 2 — Security and Compliance (30%)**
clf-shared-responsibility | clf-iam-security | clf-security-services

**Domain 3 — Cloud Technology and Services (34%)**
clf-compute | clf-storage | clf-databases | clf-networking | clf-ai-analytics | clf-other-services

**Domain 4 — Billing, Pricing, and Support (12%)**
clf-pricing-models | clf-billing-tools

## Pending Issues
- Next SAA: build `s3-security` lesson (Domain 1).
- Next CLF: build `clf-migration` lesson (Domain 1: Task 1.3 — Migration tools and strategies).

## clf-migration lesson plan
- Scenario: a traditional company planning their first cloud migration
- Deeper migration strategy content (7 Rs applied, not just listed)
- Migration phases: Assess, Mobilize, Migrate and Modernize
- Migration tools to cover: AWS Migration Hub, Application Discovery Service (ADS), Application Migration Service (MGN), Database Migration Service (DMS), DataSync, Transfer Family, Snow Family (Snowball Edge, Snowmobile)
- Snow Family comparison table: Snowball Edge Compute/Storage, Snowmobile; when to use each
- CLI exercises: DMS, DataSync, Snow job creation
- 15 flashcards, 10 quiz questions
- ScenarioBlock color: 'sky'
- Domain: clf-domain-1 (sky accent)
