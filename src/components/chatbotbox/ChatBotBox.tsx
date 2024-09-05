import React from 'react';
import { chatbotContainer, chatbotIcon, chatbotTextbox } from './chatbotBox.css';

type ChatBotBoxStartProps = {
  text: string[];
};

const ChatBotBoxStart = ({ text }: ChatBotBoxStartProps) => {
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
