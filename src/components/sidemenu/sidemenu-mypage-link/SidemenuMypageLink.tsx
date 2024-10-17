import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore 관련 함수 import
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { user_profile } from '../../../assets/assets';
import { USER_COLLECTION } from '../../../firebase/firebase';
import useUserStore from '../../../stores/useUserStore';
import {
  sidemenuMypageLine,
  sidemenuMypageMoveButton,
  sidemenuUserProfileBox,
  sidemenuUserProfileButton,
  sidemenuUserProfileIcon,
  sidemenuUserProfileLogout,
  sidemenuUserProfileText,
} from './sidemenuMypageLink.css';

const SidemenuMypageLinks = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [userName, setUserName] = useState<string>(''); // 사용자 이름 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가
  const [profileImage, setProfileImage] = useState<string>(user_profile); // 기본 이미지로 설정

  // Firestore에서 사용자 정보를 가져오는 함수
  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      console.log('Fetching data for UID:', user.uid); // uid 로그 출력
      try {
        const userDoc = await getDoc(doc(USER_COLLECTION, user.uid)); // Firestore에서 유저 정보 가져오기
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Firestore에서 userName 필드를 상태에 저장
          setUserName(userData.userName || userData.username);
          setProfileImage(userData.profileImage || user_profile);
        } else {
          setError('No user document found.');
        }
      } catch (error) {
        setError('Error fetching user data.');
      }
    } else {
      setError('No authenticated user.');
    }
  };

  useEffect(() => {
    fetchUserData(); // 컴포넌트 마운트 시 Firestore에서 사용자 정보 가져옴
  }, [auth]);

  const { setUser } = useUserStore();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        //사용자 정보 비우기
        setUser(null);
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
      })
      .catch(error => {
        console.error('로그아웃 실패:', error);
      });
  };

  const handleNavigateLiked = () => {
    navigate('/liked');
  };
  const handleNavigateViewedhistory = () => {
    navigate('/viewedhistory');
  };
  const handleNavigateEmptyShoesroom = () => {
    navigate('/empty-shoesroom');
  };
  const handleNavigateFootinfo = () => {
    navigate('/footinfo');
  };
  const handleNavigateMy = () => {
    navigate('/my');
  };

  return (
    <>
      <hr className={sidemenuMypageLine} />
      <div>
        <button className={sidemenuMypageMoveButton} onClick={handleNavigateLiked}>
          좋아요
        </button>
        <span>|</span>
        <button className={sidemenuMypageMoveButton} onClick={handleNavigateViewedhistory}>
          최근 본
        </button>
      </div>
      <div>
        <button className={sidemenuMypageMoveButton} onClick={handleNavigateEmptyShoesroom}>
          신발장
        </button>
      </div>
      <div>
        <button className={sidemenuMypageMoveButton} onClick={handleNavigateFootinfo}>
          내 발 정보
        </button>
      </div>
      <hr className={sidemenuMypageLine} />

      <div className={sidemenuUserProfileBox}>
        <button className={sidemenuUserProfileButton} onClick={handleNavigateMy}>
          <img className={sidemenuUserProfileIcon} src={profileImage} alt="user_profile" />
          {/* Firestore에서 받아온 사용자 이름을 표시 */}
          <span className={sidemenuUserProfileText}>{userName}</span>
        </button>
        <button className={sidemenuUserProfileLogout} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      {/* 에러가 있을 경우 에러 메시지 표시 */}
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default SidemenuMypageLinks;
