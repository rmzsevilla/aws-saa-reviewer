import * as iamModule from './iam'
import * as iamAdvancedModule from './iam-advanced'

// Registry: maps lesson ID → { Content, flashcards, quiz, meta }
export const lessonRegistry = {
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
}
