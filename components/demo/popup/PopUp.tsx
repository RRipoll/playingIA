/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import './PopUp.css';

interface PopUpProps {
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Welcome to the English Conversation Coach</h2>
        <p>Your personal AI tutor for improving pronunciation and conversation skills.</p>
        <p>To get started:</p>
        <ol>
          <li><span className="icon">record_voice_over</span>Choose a conversation category on the main screen.</li>
          <li><span className="icon">play_circle</span>Press the Play button to start streaming audio.</li>
          <li><span className="icon">mic</span>Press the Microphone button and start speaking.</li>
        </ol>
        <button onClick={onClose}>Start Practicing</button>
      </div>
    </div>
  );
};

export default PopUp;