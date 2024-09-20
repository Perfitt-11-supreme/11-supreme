import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { back_arrow } from '../../../assets/assets';
import { auth } from '../../../firebase/firebase';
import { responsiveBox } from '../../../styles/responsive.css';
import Button from '../../common/button/Button';
import Header from '../../common/header/Header';
import SignUpInput from '../../signup/infoInput/signupinput/SignUpInput';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../signup/signup.css';
import { fullContainer } from '../login.css';
import { accountFindBox, accountFindButton } from './emailLogin.css';
import ToastMessage from '../../toastmessage/toastMessage';

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
  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        //로그인
        const { user } = await signInWithEmailAndPassword(auth, formData.userEmail, formData.userPassword);
        console.log('로그인한 사용자:', user);

        //로그인 성공 시 이동
        navigate('/hello');
      } catch {
        setToastMessage({ message: '입력한 정보를 다시 확인해주세요.', duration: 3000 });
      }
    }
  };

  const accountFindButtons = [
    { text: '이메일 찾기', path: '/findemail' },
    { text: '비밀번호 찾기', path: '/findpassword' },
    { text: '회원가입', path: '/signupinfo' },
  ];

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      <div className={responsiveBox}>
        <div className={fullContainer}>
          {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
          <div>
            <Header imageSrc={back_arrow} alt="back arrow" title="이메일 로그인" />
            <div className={signupFormContainer} style={{ marginTop: '20px' }}>
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

              <form onSubmit={handleSubmit} className={submitbuttonContainer}>
                <Button text="로그인" width="100%" />
              </form>

              <div className={accountFindBox}>
                {accountFindButtons.map((button, index) => (
                  <div key={index} className={accountFindButton} onClick={() => navigate(button.path)}>
                    {button.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmailLogin;
