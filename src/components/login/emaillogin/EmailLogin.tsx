import { useNavigate } from 'react-router-dom';
import Button from '../../common/button/Button';
import Header from '../../empty-shoes-room/header/Header';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../signup/signup.css';
import { accountSearchBox, accountSearchButton } from './emailLogin.css';
import { useState } from 'react';
import SignUpInput from '../../signup/infoInput/signupinput/SignUpInput';
import { fullContainer } from '../login.css';

const EmailLogin = () => {
  type FormErrors = {
    userEmail?: string;
    userPassword?: string;
    [key: string]: string | undefined;
  };

  type FormData = {
    userEmail: string;
    userPassword: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    userEmail: '',
    userPassword: '',
  });

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.userEmail) {
      newErrors.userEmail = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(data.userEmail)) {
      newErrors.userEmail = '유효한 형식의 이메일을 입력해주세요';
    }
    if (!data.userPassword) newErrors.userPassword = '비밀번호를 입력해주세요';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    const updatedErrors = validate({
      ...formData,
      [name]: value,
    });
    setErrors(prev => ({
      ...prev,
      [name]: updatedErrors[name],
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate('/hello');
    }
  };

  const accountSearchButtons = [
    { text: '이메일 찾기', path: '' },
    { text: '비밀번호 찾기', path: '' },
    { text: '회원가입', path: '/signupinfo' },
  ];

  return (
    <>
      <div className={fullContainer}>
        <div>
          <Header title="이메일 로그인" />
          <div className={signupFormContainer} style={{ marginTop: '20px' }}>
            <div>
              <SignUpInput
                label="아이디"
                type="email"
                name="userEmail"
                id="userEmail1"
                placeholder="이메일을 입력해주세요"
                value={formData.userEmail}
                onChange={handleChange}
              />
              {errors.userEmail && <div className={errorMessage}>{errors.userEmail}</div>}
            </div>

            <div className={signupFormGap}>
              <SignUpInput
                label="비밀번호"
                type="password"
                name="userPassword"
                id="userPassword"
                placeholder="비밀번호를 입력해주세요"
                value={formData.userPassword}
                onChange={handleChange}
              />
              {errors.userPassword && <div className={errorMessage}>{errors.userPassword}</div>}
            </div>

            <div className={submitbuttonContainer}>
              <form onSubmit={handleSubmit}>
                <Button text="로그인" />
              </form>
            </div>

            <div className={accountSearchBox}>
              {accountSearchButtons.map((button, index) => (
                <div key={index} className={accountSearchButton} onClick={() => navigate(button.path)}>
                  {button.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmailLogin;
