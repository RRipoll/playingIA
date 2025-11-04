/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import './WelcomeScreen.css';
import { usePrompts } from '../../../lib/state';
import { promptContent, PromptTemplate } from '@/lib/prompts';

const WelcomeScreen: React.FC = () => {
  const { template, setTemplate } = usePrompts();
  const { title, description, prompts } = promptContent[template];
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="title-container">
          <span className="welcome-icon">record_voice_over</span>
          <div className="title-selector">
            <select
              value={template}
              onChange={e => setTemplate(e.target.value as PromptTemplate)}
              aria-label="Select a conversation category"
            >
              <option value="daily-life">Daily Life</option>
              <option value="professional">Professional</option>
              <option value="creative">Creative</option>
            </select>
            <span className="icon">arrow_drop_down</span>
          </div>
        </div>
        <p>{description}</p>
        <div className="example-prompts">
          {prompts.map((prompt, index) => (
            <div key={index} className="prompt">
              {prompt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;