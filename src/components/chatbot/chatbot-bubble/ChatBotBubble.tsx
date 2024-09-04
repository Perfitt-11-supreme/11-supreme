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
            <p>{bubbleContent}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatBotBubble