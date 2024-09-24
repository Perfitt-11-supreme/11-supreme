import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { google, hamburger_menu } from '../../assets/assets';
import { signInWithGoogle } from '../../firebase/firebase';
import useUserStore from '../../stores/useUserStore';
import { responsiveBox } from '../../styles/responsive.css';
import { TUser } from '../../types/user';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import ToastMessage from '../toastmessage/toastMessage';
import { fullContainer, loginbuttonContainer, loginbuttonTextContainer } from './login.css';
import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import LoginButton from './loginchatbot/loginbox/LoginButton';

const Login = () => {
  const navigate = useNavigate();
  const db = getFirestore();
  const { setUser } = useUserStore();
  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);

  const handleGoogleLogin = async () => {
    try {
      //로그인
      const { user } = await signInWithGoogle();

      //Firestore에서 사용자 정보 존재 유무를 uid로 조회
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        //Firestore에서 가져온 사용자 정보를 userData로 받기
        const userData: TUser = {
          ...userDoc.data(),
        };
        setUser(userData); //userData를 zustand에 저장
        console.log('로그인한 사용자:', userData);
        navigate('/hello'); //기존 사용자: 로그인 성공 후 /hello(로그인 후 첫 화면) 페이지로 이동
      } else {
        const newGoogleUser = {
          uid: user.uid, //구글 회원가입 시 자동 생성된 uid 저장
          email: user.email || '',
          userName: user.displayName || '',
          // isGoogle: true,
        };

        setUser(newGoogleUser); //신규 사용자 정보를 zustand에 저장
        navigate('/googlesignup'); //신규 사용자: /googlesignup(추가 정보 입력) 페이지로 이동
      }
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
