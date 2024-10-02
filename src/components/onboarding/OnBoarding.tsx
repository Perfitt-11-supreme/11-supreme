import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboarding1, onboarding2 } from '../../assets/assets';
import { auth, db } from '../../firebase/firebase';
import useUserStore from '../../stores/useUserStore';
import Button from '../common/button/Button';
import { buttonDiv, container, descP, slide, slide0, slide1, slidesWrapper } from './onboarding.css';

const OnBoarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  //로그인 지속성
  const setUser = useUserStore(state => state.setUser);
  const clearUser = useUserStore(state => state.clearUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // Firestore에서 사용자 정보 존재 유무를 uid로 조회
        const userDocRef = doc(db, 'users', user.uid);

        try {
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData); // Zustand에 로그인한 사용자 정보를 저장
            // console.log('현재 로그인한 사용자:', userData);
          } else {
            clearUser(); // 상태 초기화
            // console.log('인증은 되었으나 사용자 등록이 완료되지 않은 상태');
          }
        } catch {
          // console.error('사용자 정보를 가져오는 중 오류 발생:', error);
          clearUser(); // 에러 발생 시 상태 초기화
        }
      } else {
        clearUser(); // 상태 초기화
        // console.log('로그아웃 상태');
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [setUser, clearUser]);

  const handlePageMove = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      navigate('/login'); //로그인되어 있지 않은 경우
    } else {
      //Firestore에서 사용자 정보 존재 유무를 uid로 조회
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        navigate('/chat'); //로그인되어 있는 경우
      } else {
        await currentUser.delete(); //사용자 인증 데이터 삭제
        // console.log('사용자 인증 데이터 삭제');
        navigate('/login'); //인증은 되었으나 Firestore에는 사용자 등록이 되어있지 않은 경우
      }
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className={container}>
      <div className={`${slidesWrapper} ${currentSlide === 0 ? slide0 : slide1}`}>
        <div className={slide}>
          <p className={descP}>
            AI에게 질문만으로
            <br />
            원하는 신발을 찾아보세요!
          </p>
          <div>
            <img src={onboarding1} alt="onboarding1" />
          </div>
          <div className={buttonDiv}>
            <Button text="다음" onClick={handleNextSlide} />
          </div>
        </div>
        <div className={slide}>
          <p className={descP}>
            발 촬영하면 원하는 신발의
            <br />딱 맞는 사이즈를 추천해드려요.
          </p>
          <div>
            <img src={onboarding2} alt="" />
          </div>
          <div className={buttonDiv}>
            <Button text="시작하기" onClick={handlePageMove} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnBoarding;
