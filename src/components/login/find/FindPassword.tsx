import { useNavigate } from 'react-router-dom';
import Button from '../../common/button/Button';
import Header from '../../common/header/Header';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../signup/signup.css';
import { accountFindBox, accountFindButton } from '../emaillogin/emailLogin.css';
import { useState } from 'react';
import SignUpInput from '../../signup/infoInput/signupinput/SignUpInput';
import { foundResultStyle, fullContainer } from '../login.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { db, auth } from '../../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { back_arrow } from '../../../assets/assets';

const FindPassword = () => {
  type FormErrors = {
    userEmail?: string;
    userName?: string;
  };

  type FormData = {
    userEmail: string;
    userName: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    userEmail: '',
    userName: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.userEmail) {
      newErrors.userEmail = '이메일을 입력해 주세요';
    } else if (!/\S+@\S+\.\S+/.test(data.userEmail)) {
      newErrors.userEmail = '유효한 형식의 이메일을 입력해 주세요';
    }
    if (!data.userName) {
      newErrors.userName = '이름을 입력해 주세요';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updatedFormData = {
        ...prev,
        [name]: value,
      };

      const updatedErrors = validate(updatedFormData);

      setErrors(prevErrors => ({
        ...prevErrors,
        [name as keyof FormErrors]: updatedErrors[name as keyof FormErrors],
      }));

      return updatedFormData;
    });
  };

  const handleFindPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate(formData);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    try {
      //일치하는 사용자 정보 찾기
      const userQuery = query(
        collection(db, 'users'),
        where('userName', '==', formData.userName),
        where('email', '==', formData.userEmail)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        //일치하는 사용자 정보가 있으면 비밀번호 재설정 이메일 전송
        await sendPasswordResetEmail(auth, formData.userEmail);
        setSuccessMessage('비밀번호 재설정 이메일을 보냈습니다.');
        setError('');
      } else {
        setSuccessMessage(null);
        setError('일치하는 사용자 정보를 찾을 수 없습니다.'); //일치하는 사용자 정보가 없을 때
      }
    } catch (error) {
      console.error('비밀번호 찾기 오류:', error);
      setError('비밀번호 찾기에 실패했습니다. 다시 시도해 주세요.');
      setSuccessMessage(null);
    }
  };

  const navigate = useNavigate();

  const accountFindButtons = [
    { text: '이메일 로그인', path: '/emaillogin' },
    { text: '이메일 찾기', path: '/findemail' },
    { text: '회원가입', path: '/signupinfo' },
  ];

  return (
    <div className={fullContainer}>
      <div>
        <Header imageSrc={back_arrow} alt="back arrow" title="비밀번호 찾기" />
        <div className={signupFormContainer} style={{ marginTop: '20px' }}>
          <form onSubmit={handleFindPassword}>
            <div>
              <SignUpInput
                label="이름"
                type="text"
                name="userName"
                id="userName"
                placeholder="이름을 입력해 주세요"
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && <div className={errorMessage}>{errors.userName}</div>}
            </div>

            <div className={signupFormGap}>
              <SignUpInput
                label="이메일"
                type="email"
                name="userEmail"
                id="userEmail"
                placeholder="이메일을 입력해 주세요"
                value={formData.userEmail}
                onChange={handleChange}
              />
              {errors.userEmail && <div className={errorMessage}>{errors.userEmail}</div>}
            </div>

            <div className={submitbuttonContainer}>
              <Button text="비밀번호 찾기" />
            </div>
          </form>

          {successMessage && <div className={foundResultStyle}>{successMessage}</div>}
          {error && <div className={foundResultStyle}>{error}</div>}

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
  );
};

export default FindPassword;