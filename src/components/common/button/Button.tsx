import { TButton } from '../../../types/button';
import { button } from './button.css';

const Button = ({ text, onClick }: TButton) => {
  return (
    <>
      <button className={button} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
