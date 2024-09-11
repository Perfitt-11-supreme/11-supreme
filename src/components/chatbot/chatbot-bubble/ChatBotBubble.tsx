import ReactMarkdown from 'react-markdown';
import { prefitt_symbol } from "../../../assets/assets";
import { TChat } from "../../../types/chat";
import { chatBotBubbleContainer, chatBotBubbleText, chatBotBubbleWrap } from "./chatBotBubble.css";

const ChatBotBubble = ({ bubbleContent }: TChat) => {
  return (
    <>
      <div className={chatBotBubbleWrap}>
        <div className={chatBotBubbleContainer}>
          <img src={prefitt_symbol} alt="" />
          <div className={chatBotBubbleText}>
            <ReactMarkdown>{bubbleContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatBotBubble