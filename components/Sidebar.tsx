/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useSettings, useUI, usePrompts } from '@/lib/state';
import c from 'classnames';
import { DEFAULT_LIVE_API_MODEL, AVAILABLE_VOICES } from '@/lib/constants';
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';

const AVAILABLE_MODELS = [DEFAULT_LIVE_API_MODEL];

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUI();
  const {
    systemPrompt,
    model,
    voice,
    setSystemPrompt,
    setModel,
    setVoice,
  } = useSettings();
  const { topics, toggleTopic } = usePrompts();
  const { connected } = useLiveAPIContext();

  return (
    <>
      <aside className={c('sidebar', { open: isSidebarOpen })}>
        <div className="sidebar-header">
          <h3>Settings</h3>
          <button onClick={toggleSidebar} className="close-button">
            <span className="icon">close</span>
          </button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-section">
            <fieldset disabled={connected}>
              <label>
                System Prompt
                <textarea
                  value={systemPrompt}
                  onChange={e => setSystemPrompt(e.target.value)}
                  rows={10}
                  placeholder="Describe the role and personality of the AI..."
                />
              </label>
              <label>
                Model
                <select value={model} onChange={e => setModel(e.target.value)}>
                  {/* This is an experimental model name that should not be removed from the options. */}
                  {AVAILABLE_MODELS.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Voice
                <select value={voice} onChange={e => setVoice(e.target.value)}>
                  {AVAILABLE_VOICES.map(v => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>
          </div>
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Conversation Topics</h4>
            <div className="tools-list">
              {topics.map(topic => (
                <div key={topic.name} className="tool-item">
                  <label className="tool-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`tool-checkbox-${topic.name}`}
                      checked={topic.isEnabled}
                      onChange={() => toggleTopic(topic.name)}
                      disabled={connected}
                    />
                    <span className="checkbox-visual"></span>
                  </label>
                  <label
                    htmlFor={`tool-checkbox-${topic.name}`}
                    className="tool-name-text"
                  >
                    {topic.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}