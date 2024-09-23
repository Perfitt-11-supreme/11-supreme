import { useNavigate } from 'react-router-dom';
import Button from '../../common/button/Button';
import Header from '../../common/header/Header';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../signup/signup.css';
import { accountFindBox, accountFindButton } from '../emaillogin/emailLogin.css';
import { useEffect, useRef, useState } from 'react';
import SignUpInput from '../../signup/infoInput/signupinput/SignUpInput';
import { foundResultStyle, fullContainer } from '../login.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { db, auth } from '../../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { back_arrow } from '../../../assets/assets';
import { responsiveBox } from '../../../styles/responsive.css';
import SignUpInfoModal from '../../signup/infoInput/SignUpInfoModal';
import SignUpSizeModal from '../../signup/sizeinput/SignUpSizeModal';

const FindPassword = () => {
  type FormErrors = {
    userEmail?: string;
    userName?: string;
  };

  type FormData = {
    userEmail: string;
    userName: string;
  };

  const navigate = useNavigate();

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

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFindPassword = async () => {
    setErrors({});

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
      setError('다시 시도해 주세요.');
      setSuccessMessage(null);
    }
  };

  //모달 외부 클릭 시 모달 닫기
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const infoModalRef = useRef<HTMLDivElement | null>(null);
  const sizeModalRef = useRef<HTMLDivElement | null>(null); //ref 생성

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isInfoModalOpen && infoModalRef.current && !infoModalRef.current.contains(event.target as Node)) {
        setIsInfoModalOpen(false);
      }
      if (isSizeModalOpen && sizeModalRef.current && !sizeModalRef.current.contains(event.target as Node)) {
        setIsSizeModalOpen(false);
      }
    };

    if (isInfoModalOpen || isSizeModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInfoModalOpen, isSizeModalOpen]);

  const accountFindButtons = [
    { text: '이메일 로그인', path: () => navigate('/emaillogin') },
    { text: '이메일 찾기', path: () => navigate('/findemail') },
    { text: '회원가입', path: () => setIsInfoModalOpen(true) },
  ];

  return (
    <>
      <div className={responsiveBox} style={{ overflow: 'hidden' }}>
        <div className={fullContainer}>
          <div>
            <Header imageSrc={back_arrow} alt="back arrow" title="비밀번호 찾기" />
            <div className={signupFormContainer} style={{ marginTop: '20px' }}>
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
                <Button text="비밀번호 찾기" onClick={handleFindPassword} />
              </div>

              {successMessage && <div className={foundResultStyle}>{successMessage}</div>}
              {error && <div className={foundResultStyle}>{error}</div>}

              <div className={accountFindBox}>
                {accountFindButtons.map((button, index) => (
                  <div key={index} className={accountFindButton} onClick={button.path}>
                    {button.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isInfoModalOpen && (
          <div ref={infoModalRef}>
            <SignUpInfoModal
              isOpen={isInfoModalOpen}
              onNext={() => {
                setIsInfoModalOpen(false);
                setIsSizeModalOpen(true);
              }}
            />
          </div>
        )}
        {isSizeModalOpen && (
          <div ref={sizeModalRef}>
            <SignUpSizeModal isOpen={isSizeModalOpen} onClose={() => navigate('/hello')} />
          </div>
        )}
      </div>
    </>
  );
};

export default FindPassword;
