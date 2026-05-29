import * as iamModule from './iam'

// Registry: maps lesson ID → { Content, flashcards, quiz, meta }
export const lessonRegistry = {
  iam: {
    Content: iamModule.Content,
    flashcards: iamModule.flashcards,
    quiz: iamModule.quiz,
    meta: iamModule.meta,
  },
}
