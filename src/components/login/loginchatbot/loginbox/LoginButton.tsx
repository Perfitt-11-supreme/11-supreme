import { loginButton, loginIcon, loginTextbox } from './loginButton.css';

type LoginButtonProps = {
  imageSrc?: string;
  text: string;
  onClick?: () => void;
};

const LoginButton = ({ imageSrc, text, onClick }: LoginButtonProps) => {
  return (
    <button className={loginButton} onClick={onClick}>
      {imageSrc && <img src={imageSrc} className={loginIcon} alt="icon" />}
      <span className={loginTextbox}>{text}</span>
    </button>
  );
};

export default LoginButton;
