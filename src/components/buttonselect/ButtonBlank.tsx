import { TButton } from '../../types/button';
import { buttonBlank } from './buttonBlank.css';

const ButtonBlank = ({ text, onClick }: TButton & { onClick: () => void }) => {
  return (
    <>
      <button onClick={onClick} className={buttonBlank}>
        {text}
      </button>
    </>
  );
};

export default ButtonBlank;
