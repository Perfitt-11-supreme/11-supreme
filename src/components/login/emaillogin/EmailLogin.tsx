import { deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { back_arrow } from '../../../assets/assets';
import { auth, db } from '../../../firebase/firebase';
import { useChatCompletion } from '../../../hooks/useChatCompletionHook';
import useUserStore from '../../../stores/useUserStore';
import { responsiveBox } from '../../../styles/responsive.css';
import { TUser } from '../../../types/user';
import Button from '../../common/button/Button';
import Header from '../../common/header/Header';
import SignUpInfoModal from '../../signup/infoInput/SignUpInfoModal';
import SignUpInput from '../../signup/infoInput/signupinput/SignUpInput';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../signup/signup.css';
import SignUpSizeModal from '../../signup/sizeinput/SignUpSizeModal';
import ToastMessage from '../../toastmessage/toastMessage';
import { fullContainer } from '../login.css';
import { accountFindBox, accountFindButton } from './emailLogin.css';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const EmailLogin = () => {
  type FormData = {
    email: string;
    password: string;
  };

  type FormErrors = {
    email?: string;
    password?: string;
  };

  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);
  const { handleNewChat } = useChatCompletion();
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: FormErrors = {};
    const { email, password } = formData;

    if (!email) {
      newErrors.email = '이메일을 입력해 주세요';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '유효한 형식의 이메일을 입력해 주세요';
    }
    if (!password) newErrors.password = '비밀번호를 입력해 주세요';

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({
      ...prev,
      [name]: value ? undefined : prev[name as keyof FormErrors],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      checkUserStatus(async () => {
        try {
          //로그인
          const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);

          //Firestore에서 사용자 정보 존재 유무를 uid로 조회
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            //Firestore에서 가져온 사용자 정보를 userData로 받기
            const userData: TUser = {
              ...userDoc.data(),
            };
            setUser(userData); //userData를 zustand에 저장
            // console.log('로그인한 사용자:', userData);
            const newChatId = await handleNewChat();
            navigate(`/hello/${newChatId}`); //로그인 성공 시 이동
          } else {
            //인증은 되었으나 Firestore에는 사용자 등록이 되어있지 않은 경우
            await deleteUser(user); //사용자 인증 데이터 삭제
            // console.log('인증은 되었으나 사용자 등록이 완료되지 않은 상태');
            // console.log('사용자 인증 데이터 삭제');
            setToastMessage({ message: '입력한 정보를 다시 확인해 주세요.', duration: 3000 });
          }
        } catch {
          // console.error('이메일 로그인 실패:', error);
          setToastMessage({ message: '입력한 정보를 다시 확인해 주세요.', duration: 3000 });
        }
      });
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  //로그인 상태 체크 함수
  //로그인되어 있는 경우라면, 로그인 버튼 클릭 시 더 이상의 작업 차단 및 토스트 메시지 표시
  const firestore = getFirestore();
  const { user } = useUserStore();

  const checkUserStatus = async (action: () => void) => {
    if (user && user.uid) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setToastMessage({ message: '먼저 로그아웃을 해주세요.', duration: 3000 }); //로그인되어 있는 경우
      } else {
        action(); //인증은 되었으나 Firestore에는 사용자 등록이 되어있지 않은 경우
      }
    } else {
      action(); //로그인되어 있지 않은 경우
    }
  };

  const accountFindButtons = [
    { text: '이메일 찾기', path: () => navigate('/findemail') },
    { text: '비밀번호 찾기', path: () => navigate('/findpassword') },
    { text: '회원가입', path: () => setIsInfoModalOpen(true) },
  ];

  return (
    <>
      <div className={responsiveBox} style={{ overflow: 'hidden', position: 'relative' }}>
        <div className={fullContainer}>
          {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
          <div>
            <Header imageSrc={back_arrow} alt="back arrow" title="이메일 로그인" />
            <div className={signupFormContainer} style={{ marginTop: '20px' }}>
              <form onSubmit={handleSubmit}>
                <SignUpInput
                  label="아이디"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="이메일을 입력해 주세요"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className={errorMessage}>{errors.email}</div>}

                <div className={signupFormGap}>
                  <SignUpInput
                    label="비밀번호"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className={errorMessage}>{errors.password}</div>}
                </div>

                <div className={submitbuttonContainer}>
                  <Button type="submit" text="로그인" width="100%" />
                </div>
              </form>

              <div className={accountFindBox}>
                {accountFindButtons.map((button, index) => (
                  <div key={index} className={accountFindButton} onClick={() => checkUserStatus(button.path)}>
                    {button.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isInfoModalOpen && (
          <SignUpInfoModal
            isOpen={isInfoModalOpen}
            onNext={() => {
              setIsInfoModalOpen(false);
              setIsSizeModalOpen(true);
            }}
            onClose={() => setIsInfoModalOpen(false)}
          />
        )}
        {isSizeModalOpen && <SignUpSizeModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />}
      </div>
    </>
  );
};
export default EmailLogin;
