import React from 'react';
import { chatbotContainer, chatbotIcon, chatbotTextbox } from './chatbotBox.css';

interface ChatBotBoxStartProps {
  text: string[];
}

const ChatBotBoxStart: React.FC<ChatBotBoxStartProps> = ({ text }) => {
  return (
    <div className={chatbotContainer}>
      <div className={chatbotIcon} />
      <div className={chatbotTextbox}>
        {text.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatBotBoxStart;
