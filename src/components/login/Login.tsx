import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import Header from '../common/header/Header';
import LoginButton from './loginchatbot/loginbox/LoginButton';
import { google, hamburger_menu } from '../../assets/assets';
import { loginbuttonContainer, loginbuttonTextContainer, fullContainer } from './login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { responsiveBox } from '../../styles/responsive.css';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import { useEffect, useState } from 'react';
import ToastMessage from '../toastmessage/toastMessage';

const Login = () => {
  const navigate = useNavigate();
  const db = getFirestore();

  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;

      //Firestore에서 사용자 정보 존재 유무를 조회
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        //기존 가입자: 로그인 성공 후 /hello(로그인 후 첫 화면) 페이지로 이동
        navigate('/hello');
      } else {
        //신규 가입자: /googleinfo(추가 정보 입력) 페이지로 이동
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          userName: user.displayName || '', //구글 프로필에서 사용자 이름 가져오기
          // gender: '',
          // birthDate: { year: '', month: '', day: '' },
        });
        navigate('/googlesignup');
      }

      //사용자 ID를 localStorage에 저장
      localStorage.setItem('userUID', user.uid);
    } catch (error) {
      console.error('구글 로그인 실패:', error);
      setToastMessage({ message: '다시 시도해 주세요.', duration: 3000 });
    }
  };

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
          <Header imageSrc={hamburger_menu} alt="hamburger menu" />
          <div style={{ marginTop: '20px', marginLeft: '16px' }}>
            <ChatBotBox text={['안녕하세요 펄핏AI 입니다!', '맞춤 추천을 위해 먼저 로그인을 해주세요.']} />
          </div>

          <div className={loginbuttonContainer}>
            <LoginButton imageSrc={google} text="구글" onClick={handleGoogleLogin} />
            <LoginButton text="이메일 로그인" onClick={() => navigate('/emaillogin')} />
            <div className={loginbuttonTextContainer}>또는</div>
            <LoginButton text="회원가입 하기" onClick={() => navigate('/signupinfo')} />
          </div>

          <div style={{ marginTop: 'auto' }}>
            <ChatbotSearchInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
