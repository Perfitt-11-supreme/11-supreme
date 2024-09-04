import Button from '../../../common/button/Button';
import { TextFooter_Background } from './textfooter.css';

const TextFooter = () => {
  return (
    <>
      <div className={TextFooter_Background}>
        <Button text="선택 완료" />
      </div>
    </>
  );
};
export default TextFooter;
