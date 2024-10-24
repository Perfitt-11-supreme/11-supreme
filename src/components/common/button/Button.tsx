import { TButton } from '../../../types/button';
import { button, ButtonOpacity } from './button.css';

const Button = ({ text, onClick, id, width = '343px', type = 'submit', opacity = false }: TButton) => {
  return (
    <>
      <button
        className={`${button} ${opacity ? ButtonOpacity.opacity : ButtonOpacity.nonOpacity}`}
        onClick={onClick}
        style={{ width }}
        id={id}
        type={type}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
