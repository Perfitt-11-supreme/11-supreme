import { TButton } from '../../../types/button';
import { button } from './button.css';

const Button = ({ text, onClick, width = '343px' }: TButton) => {
  return (
    <>
      <button className={button} onClick={onClick} style={{ width }}>
        {text}
      </button>
    </>
  );
};

export default Button;
