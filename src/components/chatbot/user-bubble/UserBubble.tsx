import { TChat } from "../../../types/chat";
import { userBubble, userBubbleText, userBubbleWrap } from "./userBubble.css";

const UserBubble = ({ bubbleContent }: TChat) => {
  return (
    <>
      <div className={userBubbleWrap}>
        <div className={userBubble}>
          <p className={userBubbleText}>{bubbleContent}</p>
        </div>
      </div>
    </>
  );
}
export default UserBubble