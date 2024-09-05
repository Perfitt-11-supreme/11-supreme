import { TButton } from '../../../../../types/button';
import { buttonFill } from './buttonFill.css';

const ButtonFill = ({ text, onClick }: TButton & { onClick: () => void }) => {
  return (
    <>
      <button onClick={onClick} className={buttonFill}>
        {text}
      </button>
    </>
  );
};

export default ButtonFill;
