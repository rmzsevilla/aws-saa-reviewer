import * as iamModule from './iam'
import * as iamAdvancedModule from './iam-advanced'
import * as clfCloudConceptsModule from './clf-cloud-concepts'

// Registry: maps lesson ID → { Content, flashcards, quiz, meta }
export const lessonRegistry = {
  // ── SAA-C03 ──────────────────────────────────────────────────
  iam: {
    Content: iamModule.Content,
    flashcards: iamModule.flashcards,
    quiz: iamModule.quiz,
    meta: iamModule.meta,
  },
  'iam-advanced': {
    Content: iamAdvancedModule.Content,
    flashcards: iamAdvancedModule.flashcards,
    quiz: iamAdvancedModule.quiz,
    meta: iamAdvancedModule.meta,
  },
  // ── CLF-C02 ──────────────────────────────────────────────────
  'clf-cloud-concepts': {
    Content: clfCloudConceptsModule.Content,
    flashcards: clfCloudConceptsModule.flashcards,
    quiz: clfCloudConceptsModule.quiz,
    meta: clfCloudConceptsModule.meta,
  },
}
