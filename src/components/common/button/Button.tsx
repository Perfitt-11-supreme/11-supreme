import { TButton } from '../../../types/button';
import { button } from './button.css';

const Button = ({ text, onClick, width = '343px', id, type = 'submit' }: TButton) => {
  return (
    <>
      <button className={button} onClick={onClick} style={{ width }} id={id} type={type}>
        {text}
      </button>
    </>
  );
};

export default Button;
