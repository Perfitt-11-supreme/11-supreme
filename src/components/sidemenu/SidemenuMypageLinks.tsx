import { user_profile } from '../../assets/assets';
import {
  sidemenuMypageLine,
  sidemenuMypageMoveButton,
  sidemenuUserProfileBox,
  sidemenuUserProfileButton,
  sidemenuUserProfileIcon,
  sidemenuUserProfileLogout,
  sidemenuUserProfileText,
} from './sidemenuMypageLinks.css';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SidemenuMypageLinks = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // 로그아웃 성공 시
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
      })
      .catch(error => {
        console.error('로그아웃 실패:', error);
      });
  };

  const handleNavigation = (path: string) => {
    navigate(path); // 특정 경로로 이동
  };

  return (
    <>
      <hr className={sidemenuMypageLine} />
      <div>
        <button className={sidemenuMypageMoveButton} onClick={() => handleNavigation('/likedpage')}>
          좋아요
        </button>
        <span>|</span>
        <button className={sidemenuMypageMoveButton} onClick={() => handleNavigation('/viewedhistorypage')}>
          최근 본
        </button>
      </div>
      <div>
        <button className={sidemenuMypageMoveButton} onClick={() => handleNavigation('/empty-shoesroom')}>
          신발장
        </button>
      </div>
      <div>
        <button className={sidemenuMypageMoveButton} onClick={() => handleNavigation('/footinfo')}>
          내 발 정보
        </button>
      </div>
      <hr className={sidemenuMypageLine} />

      <div className={sidemenuUserProfileBox}>
        <button className={sidemenuUserProfileButton} onClick={() => handleNavigation('/mypage')}>
          <img className={sidemenuUserProfileIcon} src={user_profile} alt="user_profile" />
          <span className={sidemenuUserProfileText}>김펄핏</span>
        </button>
        <button className={sidemenuUserProfileLogout} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </>
  );
};

export default SidemenuMypageLinks;
