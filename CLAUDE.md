# AWS SAA-C03 Study Guide — Project Context

## Purpose
React + Vite study website for AWS Solutions Architect Associate (SAA-C03) exam. Deployed to Vercel.
Lessons built one at a time for content accuracy. Always verify facts against AWS docs.

## Content Accuracy — REQUIRED
- Consult https://docs.aws.amazon.com/ before adding facts. Verify limits, defaults, behaviors.
- Keep lessons exam-relevant. Official exam guide at `docs/exam-guide.txt`. In-scope services only.
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

## Key Files
| File | Purpose |
|------|---------|
| `src/data/curriculum.js` | 32 lessons across 4 domains. `available: true` to unlock. |
| `src/data/lessons/index.js` | Registry: lessonId → { Content, flashcards, quiz, meta } |
| `src/data/lessons/{id}.jsx` | Individual lesson files |
| `src/data/awsServices.js` | Service definitions used by Dictionary and ServiceIcon |
| `src/components/FlowDiagram.jsx` | **Primary diagram.** Props: `nodes`, `edges`, `legend`, `caption`, `height`. Node types: `lucide`, `awsService`, `concept`. Handle IDs: `ts/tt` `rs/rt` `bs/bt` `ls/lt`. |
| `src/components/CliSimulator.jsx` | AWS CLI lab. Props: `exercises[]` with `{task,command,accept[],output[],hint,successNote}`. |
| `src/components/ServiceIcon.jsx` | `ICON_MAP`, `ServiceGrid`, `ServiceTagList` |
| `src/components/Callout.jsx` | Callout types: `note`, `warning`, `tip`, `important`, `examTip`. Uses `cn()`. |
| `src/components/ComparisonTable.jsx` | Uses shadcn `Table` components. Props: `title`, `headers[]`, `rows[][]`. |
| `src/components/FlashcardDeck.jsx` | Uses shadcn `Button`, `Badge`, `Progress`. |
| `src/components/QuizBlock.jsx` | Uses shadcn `Button`, `Progress`. |
| `src/components/Sidebar.jsx` | **Always dark** (`bg-[#0d1117]`) regardless of theme. Uses shadcn `Progress`, `Button`, `cn()`. |
| `src/components/AnimatedPolicyFlow.jsx` | 7-step IAM policy eval animation |
| `src/pages/Dictionary.jsx` | AWS services dictionary. Supports `?focus=<id>`. |
| `docs/exam-guide.txt` | Official SAA-C03 exam guide. |

## FlowDiagram — Rules
- Uses `useNodesState`/`useEdgesState` from `@xyflow/react` (must stay in same component as `<ReactFlow>`)
- **DO NOT split FlowCanvas into a child component** — breaks edge rendering
- **DO NOT wrap in `ReactFlowProvider`** — causes edge rendering failure
- Edge type: `'default'` (bezier curves). All edges must specify `sourceHandle` and `targetHandle`.
- Lucide icon names: only use icons confirmed in lucide-react (User, Users, Shield, ShieldAlert, Key, KeyRound, Server, Archive, Search, Building2, Code, Globe, Database, Lock, FileText, FilePen, FileCheck, FileX, Layers, Settings, Bell, CheckCircle, XCircle, AlertTriangle, Info, Zap, Cloud, Network, Box)
- Node labels: NO emojis, NO `\n` newlines — use `sublabel` field for secondary text

## Adding a New Lesson
1. Create `src/data/lessons/{lessonId}.jsx`
2. Register in `src/data/lessons/index.js`
3. Set `available: true` in `src/data/curriculum.js`

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
- Sidebar: **always dark** `#0d1117` — no light mode variant
- Domain card tints (light mode): D1=`bg-red-50/80`, D2=`bg-blue-50/80`, D3=`bg-emerald-50/80`, D4=`bg-amber-50/80`
- Lesson header: colored gradient strip per domain (`from-{color}-500/10 to-transparent`)
- ServiceTagList badges: `text-white` with `color+'40'` background (NOT category color text)
- Domain colors: D1=red, D2=blue, D3=emerald, D4=amber
- Use `cn()` from `@/lib/utils` (not `clsx`) in all components

## Completed Lessons
- ✅ `iam` — IAM Fundamentals (domain-1)
- ✅ `iam-advanced` — IAM Advanced, Organizations & Control Tower (domain-1)

## Curriculum (32 lessons)
**Domain 1 — Secure Architectures (30%)**
iam ✅ | iam-advanced ✅ | s3-security | vpc-security | waf-shield | kms | secrets-manager | cognito | security-services

**Domain 2 — Resilient Architectures (26%)**
ec2 | auto-scaling | elb | rds-aurora | dynamodb | route53 | disaster-recovery | s3-resilience | decoupling

**Domain 3 — High-Performing Architectures (24%)**
ec2-advanced | ebs-efs-fsx | lambda-serverless | containers | elasticache | vpc-networking | cloudfront-ga | data-streaming | analytics

**Domain 4 — Cost-Optimized Architectures (20%)**
ec2-pricing | s3-storage-classes | migration-transfer | observability | cost-management

## Pending Issues
- None. Next: build `s3-security` lesson (Domain 1).
