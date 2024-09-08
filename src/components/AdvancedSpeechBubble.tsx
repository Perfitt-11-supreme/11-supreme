import { theme } from "../styles/theme";
import { bubbleContainer, bubbleContent } from "./AdvancedSpeechBubble.css";

const AdvancedSpeechBubble = () => {
  return (
    <>
      <div className={bubbleContainer}>
        <div className={bubbleContent}>
        </div>
        <p style={{ color: theme.color.white }}>gd</p>
      </div>
    </>
  );
}
export default AdvancedSpeechBubble