/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import {
  promptContent,
  PromptTemplate,
  PromptTopic,
} from './prompts';
import { DEFAULT_LIVE_API_MODEL, DEFAULT_VOICE } from './constants';
// FIX: Import FunctionDeclaration and FunctionResponseScheduling to define the FunctionCall type.
import {
  FunctionDeclaration,
  FunctionResponse,
  FunctionResponseScheduling,
  LiveServerToolCall,
} from '@google/genai';

/**
 * Settings
 */
export const useSettings = create<{
  systemPrompt: string;
  model: string;
  voice: string;
  setSystemPrompt: (prompt: string) => void;
  setModel: (model: string) => void;
  setVoice: (voice: string) => void;
}>(set => ({
  systemPrompt: promptContent['daily-life'].systemPrompt,
  model: DEFAULT_LIVE_API_MODEL,
  voice: DEFAULT_VOICE,
  setSystemPrompt: prompt => set({ systemPrompt: prompt }),
  setModel: model => set({ model }),
  setVoice: voice => set({ voice }),
}));

/**
 * UI
 */
export const useUI = create<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}>(set => ({
  isSidebarOpen: false,
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

/**
 * Prompts
 */
export const usePrompts = create<{
  template: PromptTemplate;
  topics: PromptTopic[];
  setTemplate: (template: PromptTemplate) => void;
  toggleTopic: (topicName: string) => void;
}>(set => ({
  template: 'daily-life',
  topics: promptContent['daily-life'].topics,
  setTemplate: (template: PromptTemplate) => {
    set({
      template,
      topics: promptContent[template].topics,
    });
    useSettings.getState().setSystemPrompt(promptContent[template].systemPrompt);
  },
  toggleTopic: (topicName: string) =>
    set(state => ({
      topics: state.topics.map(topic =>
        topic.name === topicName
          ? { ...topic, isEnabled: !topic.isEnabled }
          : topic,
      ),
    })),
}));

// FIX: Define and export the FunctionCall interface. This was missing, causing import errors.
export interface FunctionCall extends FunctionDeclaration {
  isEnabled: boolean;
  scheduling?: FunctionResponseScheduling;
}

/**
 * Logs
 */
export interface LiveClientToolResponse {
  functionResponses?: FunctionResponse[];
}
export interface GroundingChunk {
  web?: {
    // FIX: Make uri and title optional to match @google/genai's GroundingChunk type.
    uri?: string;
    title?: string;
  };
}

export interface ConversationTurn {
  timestamp: Date;
  role: 'user' | 'agent' | 'system';
  text: string;
  isFinal: boolean;
  toolUseRequest?: LiveServerToolCall;
  toolUseResponse?: LiveClientToolResponse;
  groundingChunks?: GroundingChunk[];
}

export const useLogStore = create<{
  turns: ConversationTurn[];
  addTurn: (turn: Omit<ConversationTurn, 'timestamp'>) => void;
  updateLastTurn: (update: Partial<ConversationTurn>) => void;
  clearTurns: () => void;
}>((set, get) => ({
  turns: [],
  addTurn: (turn: Omit<ConversationTurn, 'timestamp'>) =>
    set(state => ({
      turns: [...state.turns, { ...turn, timestamp: new Date() }],
    })),
  updateLastTurn: (update: Partial<Omit<ConversationTurn, 'timestamp'>>) => {
    set(state => {
      if (state.turns.length === 0) {
        return state;
      }
      const newTurns = [...state.turns];
      const lastTurn = { ...newTurns[newTurns.length - 1], ...update };
      newTurns[newTurns.length - 1] = lastTurn;
      return { turns: newTurns };
    });
  },
  clearTurns: () => set({ turns: [] }),
}));
