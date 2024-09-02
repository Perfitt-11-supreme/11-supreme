import { TButton } from '../../../types/button';
import { button } from './button.css';

const Button = ({ text }: TButton) => {
  return (
    <>
      <button className={button}>{text}</button>
    </>
  );
};

export default Button;
