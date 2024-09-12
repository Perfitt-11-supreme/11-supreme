import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import LoginButton from './loginchatbot/loginbox/LoginButton';
import { google, hamburger_menu } from '../../assets/assets';
import { loginbuttonContainer, loginbuttonTextContainer, fullContainer } from './login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();
  const db = getFirestore();

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;

      //Firestore에서 사용자 정보 존재 유무를 조회
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        //기존 가입자: 로그인 성공 후 /hello 페이지로 이동
        navigate('/hello');
      } else {
        //신규 가입자: /signupsize(추가 정보 입력) 페이지로 이동
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || '', //구글 프로필에서 사용자 이름 가져오기
          gender: '', //추가 정보 입력 후 업데이트
          birthDate: { year: '', month: '', day: '' }, //추가 정보 입력 후 업데이트
        });
        navigate('/signupsize');
      }

      //사용자 ID를 localStorage에 저장
      localStorage.setItem('userUID', user.uid);
    } catch (error) {
      console.error('구글 로그인 실패:', error);
      alert('구글 로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div className={fullContainer}>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />

        <div style={{ marginTop: '20px' }}>
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
    </>
  );
};

export default Login;
