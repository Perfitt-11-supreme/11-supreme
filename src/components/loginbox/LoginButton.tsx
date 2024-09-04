import React from 'react';
import { loginButton, loginIcon, loginTextbox } from './loginButton.css';

interface LoginButtonProps {
  imageSrc?: string;
  text: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ imageSrc, text }) => {
  return (
    <button className={loginButton}>
      {imageSrc && <img src={imageSrc} className={loginIcon} alt="icon" />}
      <span className={loginTextbox}>{text}</span>
    </button>
  );
};

export default LoginButton;
