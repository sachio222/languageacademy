/**
 * Reading Comprehension 2
 * Advanced paragraph using vocabulary from Modules 1-13
 * Shows progression from Reading 1!
 */

export const reading2 = {
  // id and module number are set dynamically
  title: "Reading Comprehension 2 - Conversation!",
  description:
    "See your progress! Read a real French conversation using everything you've learned so far.",
  
  skipStudyMode: true,
  isReadingComprehension: true,
  concepts: [],

  readingPassage: {
    title: "Au Café (At the Café)",
    text: `Bonjour! Je veux un café, s'il vous plaît.

Oui. Voilà le café.

Merci! Où est le livre? Je veux le livre.

Il est là. C'est ce livre. Tu le veux?

Oui, je le veux. C'est bon. Qu'est-ce que c'est? C'est une chose.

C'est ça. Elle a cette chose. Elle veut ça.

Où est la femme? Elle a le chat?

Oui, elle l'a. Le chat est bon. Elle a des chats. Ils sont les chats.

Je peux avoir des chiens?

Oui, tu peux. Nous avons des chiens. Ils sont bons. Tu veux ces chiens?

Non, merci. J'ai un chien. C'est mon chien.

Bon! Au revoir!

Au revoir! Merci!`,
    translation: `Hello! I want a coffee, please.

Yes. Here is the coffee.

Thank you! Where is the book? I want the book.

It is there. It's this book. Do you want it?

Yes, I want it. It's good. What is it? It's a thing.

That's it. She has this thing. She wants that.

Where is the woman? Does she have the cat?

Yes, she has it. The cat is good. She has cats. They are the cats.

Can I have dogs?

Yes, you can. We have dogs. They are good. Do you want these dogs?

No, thank you. I have a dog. It's my dog.

Good! Goodbye!

Goodbye! Thank you!`,
  },

  vocabularyReference: [],

  exerciseConfig: {
    type: "custom",
    items: [
      {
        instruction: "What does the first person want to order?",
        prompt: "What do they want?",
        hint: "First line - 'je veux ___'",
        expectedAnswer: "un café",
        wrongAnswers: [
          { answer: "le livre", feedback: "That's mentioned later, not the first thing ordered" },
        ],
      },
      {
        instruction: "How does the waiter present the coffee?",
        prompt: "What does the waiter say when bringing coffee?",
        hint: "Second line - common French expression",
        expectedAnswer: "voilà le café",
        wrongAnswers: [
          { answer: "c'est le café", feedback: "Close! But waiter says 'voilà'" },
        ],
      },
      {
        instruction: "After getting coffee, what does the person look for?",
        prompt: "What are they looking for?",
        hint: "Look for 'où est ___?'",
        expectedAnswer: "le livre",
        wrongAnswers: [
          { answer: "le chat", feedback: "That's mentioned later in conversation" },
        ],
      },
      {
        instruction: "How is the book offered? (using object pronoun)",
        prompt: "How do they ask about wanting the book?",
        hint: "Using object pronoun 'le' - 'tu ___ veux?'",
        expectedAnswer: "tu le veux",
        wrongAnswers: [
          { answer: "tu veux le livre", feedback: "They use object pronoun 'le', not full noun" },
        ],
      },
      {
        instruction: "How does the person accept the book? (using object pronoun)",
        prompt: "How do they say they want it?",
        hint: "Using object pronoun - 'je ___ veux'",
        expectedAnswer: "je le veux",
        wrongAnswers: [
          { answer: "je veux le livre", feedback: "They use object pronoun 'le'" },
          { answer: "oui", feedback: "More specific - how do they say 'I want it'?" },
        ],
      },
      {
        instruction: "Who has the cat?",
        prompt: "Who has the cat?",
        hint: "Look for 'elle a le chat' or 'elle l'a'",
        expectedAnswer: "elle",
        wrongAnswers: [
          { answer: "je", feedback: "The narrator asks about it, doesn't have it" },
        ],
      },
      {
        instruction: "How is it confirmed she has the cat? (concise form)",
        prompt: "Concise way to say 'she has it'",
        hint: "Using object pronoun contraction - elle ___",
        expectedAnswer: "elle l'a",
        wrongAnswers: [
          { answer: "elle a le chat", feedback: "Look for the concise form with object pronoun" },
        ],
      },
      {
        instruction: "Can the person have dogs?",
        prompt: "What's the response to 'je peux avoir des chiens?'",
        hint: "First word of the response",
        expectedAnswer: "oui",
        wrongAnswers: [
          { answer: "non", feedback: "Read the response - they say yes!" },
        ],
      },
      {
        instruction: "Whose dog is mentioned at the end?",
        prompt: "Whose dog? (possessive)",
        hint: "Last mention - 'c'est ___ chien'",
        expectedAnswer: "mon chien",
        wrongAnswers: [
          { answer: "un chien", feedback: "Not just 'a dog' - whose dog is it?" },
          { answer: "le chien", feedback: "Look for possessive - 'my dog'" },
        ],
      },
      {
        instruction: "What are the last two words of the conversation?",
        prompt: "Final farewell words",
        hint: "How does the second person end the conversation?",
        expectedAnswer: "au revoir",
        wrongAnswers: [
          { answer: "merci", feedback: "That comes before - what's after 'merci'?" },
        ],
      },
    ],
  },
};

