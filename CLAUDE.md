# AWS SAA-C03 Study Guide — Project Context

## Purpose
React + Vite study website for AWS Solutions Architect Associate (SAA-C03) exam. Deployed to Vercel.
User wants lessons built one at a time to ensure content accuracy. Always check AWS docs before adding facts.

## Tech Stack
- React 18 + Vite 6, React Router v6
- Tailwind CSS v3 (`darkMode: 'class'` — dark by default, toggle available)
- Mermaid v11 (flowcharts), Lucide React (icons)
- Vercel deployment

## Key Files
| File | Purpose |
|------|---------|
| `src/data/curriculum.js` | All 32 lesson entries across 4 domains. Set `available: true` to unlock. |
| `src/data/lessons/index.js` | Registry mapping lesson IDs → their module exports |
| `src/data/lessons/{id}.jsx` | Individual lesson content files |
| `src/data/awsServices.js` | AWS service definitions (icon color, description, exam tips) |
| `src/contexts/ThemeContext.jsx` | Light/dark theme toggle (localStorage-persisted) |
| `src/components/ServiceIcon.jsx` | AWS-style colored service badge icons |
| `src/components/MermaidDiagram.jsx` | Themed diagram renderer with expand modal |
| `src/components/AnimatedPolicyFlow.jsx` | Step-through animation for IAM policy eval |
| `src/pages/Dictionary.jsx` | Full AWS services dictionary page |

## Adding a New Lesson — Steps
1. Create `src/data/lessons/{lessonId}.jsx` with these exports:
   - `export const meta = { description, services: ['SVC_ID', ...] }`
   - `export const flashcards = [{ front, back }, ...]`
   - `export const quiz = [{ question, options: [], answer: 0, explanation }]`
   - `export function Content() { return <> ... </> }`
2. Register in `src/data/lessons/index.js`:
   ```js
   import * as newLesson from './newLesson'
   export const lessonRegistry = { ..., newLesson: { Content: newLesson.Content, ... } }
   ```
3. Set `available: true` for the lesson in `src/data/curriculum.js`

## Lesson Content Template
```jsx
import Callout from '../../components/Callout'
import MermaidDiagram from '../../components/MermaidDiagram'
import ComparisonTable from '../../components/ComparisonTable'
import FlashcardDeck from '../../components/FlashcardDeck'
import QuizBlock from '../../components/QuizBlock'

export const meta = {
  description: 'Short lesson description.',
  services: ['EC2', 'S3'], // keys from awsServices.js
}
export const flashcards = [{ front: 'Q', back: 'A' }]
export const quiz = [{ question: '', options: [], answer: 0, explanation: '' }]
export function Content() {
  return (
    <>
      <h2>Section</h2>
      <p>Content...</p>
      <Callout type="examTip">Key insight</Callout>
      <MermaidDiagram title="Title" chart={`graph TD\n  A --> B`} caption="Caption" />
      <ComparisonTable title="" headers={[]} rows={[[]]} />
      {/* Flashcards & Quiz always at bottom */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">Flashcards</h2>
        <FlashcardDeck cards={flashcards} />
      </div>
      <div className="mt-4 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">Practice Quiz</h2>
        <QuizBlock questions={quiz} />
      </div>
    </>
  )
}
```

## Design System
- AWS orange accent: `text-aws-orange` / `bg-aws-orange` (#FF9900)
- Callout types: `note` (blue), `warning` (yellow), `tip` (green), `important` (orange), `examTip` (purple)
- Domain colors: Domain 1=red, Domain 2=blue, Domain 3=emerald, Domain 4=amber
- All class pairs follow pattern: `light-class dark:dark-class`

## SAA-C03 Exam Domains
- **Domain 1 – Secure Architectures (30%)** — 9 lessons
- **Domain 2 – Resilient Architectures (26%)** — 9 lessons
- **Domain 3 – High-Performing Architectures (24%)** — 9 lessons
- **Domain 4 – Cost-Optimized Architectures (20%)** — 5 lessons

## Completed Lessons
- ✅ IAM Fundamentals (domain-1 / `iam`)

## Conventions & Content Guidelines
- Minimum 10 flashcards per lesson, 5–6 quiz questions (exam-style, tricky)
- Every lesson must have at least one Mermaid diagram
- Always add `services` array to `meta` — drives the "Services in this Lesson" UI
- ComparisonTable = go-to for feature comparisons (very common exam scenario)
- Exam tips should reflect actual AWS exam distractors and common mistakes
- Content accuracy: verify against AWS docs before adding facts. Updated for 2026.
