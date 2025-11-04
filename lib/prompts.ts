/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface PromptTopic {
  name: string;
  description: string;
  isEnabled: boolean;
}

export type PromptTemplate = 'daily-life' | 'professional' | 'creative';

export interface PromptContent {
  title: string;
  systemPrompt: string;
  description: string;
  prompts: string[];
  topics: PromptTopic[];
}

export const promptContent: Record<PromptTemplate, PromptContent> = {
  'daily-life': {
    title: 'Daily Life Conversations',
    systemPrompt: `You are a friendly and patient English conversation partner. Your goal is to help the user practice everyday English conversations. Be encouraging and gently correct their mistakes in grammar and pronunciation. Keep your responses natural and not overly formal.`,
    description:
      'Practice everyday conversations like ordering food or making plans.',
    prompts: [
      "Let's order a coffee.",
      'What should we do this weekend?',
      "I'd like to buy a t-shirt.",
    ],
    topics: [
      {
        name: 'Ordering Food',
        description: 'Practice ordering at a restaurant.',
        isEnabled: true,
      },
      {
        name: 'Making Plans',
        description: 'Talk about making plans with a friend.',
        isEnabled: true,
      },
      {
        name: 'Shopping',
        description: 'Practice conversations while shopping.',
        isEnabled: false,
      },
    ],
  },
  professional: {
    title: 'Professional Conversations',
    systemPrompt: `You are a professional English communication coach. Your goal is to help the user practice their business English for situations like job interviews and meetings. Provide clear feedback on their language use, focusing on clarity, formality, and confidence.`,
    description:
      'Improve your business English for interviews, presentations, and meetings.',
    prompts: [
      'Tell me about yourself.',
      'How would you handle a difficult colleague?',
      "Let's begin the presentation.",
    ],
    topics: [
      {
        name: 'Job Interview',
        description: 'Practice common interview questions.',
        isEnabled: true,
      },
      {
        name: 'Giving a Presentation',
        description: 'Practice presenting a topic.',
        isEnabled: true,
      },
      {
        name: 'Participating in a Meeting',
        description: 'Practice expressing opinions in a meeting.',
        isEnabled: false,
      },
    ],
  },
  creative: {
    title: 'Creative Conversations',
    systemPrompt: `You are a creative and imaginative English tutor. Your goal is to help the user practice their descriptive and narrative skills. Encourage them to be creative and use vivid language. Help them with vocabulary and sentence structure to make their stories and descriptions more engaging.`,
    description:
      'Boost your creativity with storytelling and descriptive exercises.',
    prompts: [
      'Once upon a time...',
      "Describe the most beautiful place you've seen.",
      'I believe that...',
    ],
    topics: [
      {
        name: 'Storytelling',
        description: 'Create and tell a short story.',
        isEnabled: true,
      },
      {
        name: 'Describing a Picture',
        description: 'Practice describing a scene.',
        isEnabled: true,
      },
      {
        name: 'Debate a Topic',
        description: 'Practice arguing for or against a topic.',
        isEnabled: false,
      },
    ],
  },
};
