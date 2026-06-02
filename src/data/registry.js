import * as iamModule from './courses/aws/saa/lessons/iam'
import * as iamAdvancedModule from './courses/aws/saa/lessons/iam-advanced'
import * as clfCloudConceptsModule from './courses/aws/clf/lessons/cloud-concepts'
import * as clfMigrationModule from './courses/aws/clf/lessons/migration'

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
  'clf-migration': {
    Content: clfMigrationModule.Content,
    flashcards: clfMigrationModule.flashcards,
    quiz: clfMigrationModule.quiz,
    meta: clfMigrationModule.meta,
  },
}
