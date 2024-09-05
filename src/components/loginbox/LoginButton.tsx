import { loginButton, loginIcon, loginTextbox } from './loginButton.css';

type LoginButtonProps = {
  imageSrc?: string;
  text: string;
};

const LoginButton = ({ imageSrc, text }: LoginButtonProps) => {
  return (
    <button className={loginButton}>
      {imageSrc && <img src={imageSrc} className={loginIcon} alt="icon" />}
      <span className={loginTextbox}>{text}</span>
    </button>
  );
};

export default LoginButton;
