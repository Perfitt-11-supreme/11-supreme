import { useEffect, useState } from 'react';
import { hamburger_menu, sidemenu_list, sidemenu_plus } from '../../assets/assets';
import SidemenuList from '../../components/sidemenu/SidemenuList';
import {
  hamburgerIconBox,
  sidemenuHeaderContainer,
  sidemenuDimmed,
  sidemenuContainer,
  sidemenuNewChatContainer,
  newChatText,
  sidemenuListsContainer,
  sidemenuListsBox,
  sidemenuListsTitle,
  plusButtonBox,
  sidemenuMypageMoveContainer,
} from './sidemenu.css';
import SidemenuMypageLinks from './SidemenuMypageLinks';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Button from '../common/button/Button';

type SideMenuProps = {
  onClose: () => void;
};

const SideMenu = ({ onClose }: SideMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user); // 사용자가 로그인되어 있으면 true, 아니면 false
    });

    return () => {
      document.body.style.overflow = 'auto';
      unsubscribe(); // Firebase 인증 상태 변경 구독 해제
    };
  }, [auth]);

  const handleLoginClick = () => {
    onClose(); // 모달 닫기
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <section className={sidemenuDimmed} onClick={onClose}>
        <div className={sidemenuContainer} onClick={e => e.stopPropagation()}>
          {/* 헤더 */}
          <article className={sidemenuHeaderContainer}>
            <button className={hamburgerIconBox} onClick={onClose}>
              <img src={hamburger_menu} alt="hamburger_menu" />
            </button>
          </article>
          {/* 새 채팅 */}
          <article className={sidemenuNewChatContainer}>
            <button className={plusButtonBox} onClick={() => handleNavigation('/chatbot')}>
              <img src={sidemenu_plus} alt="sidemenu_plus" />
              <p className={newChatText}>새 채팅</p>
            </button>
          </article>
          {/* 리스트 */}
          <article className={sidemenuListsContainer}>
            <h3 className={sidemenuListsTitle}>오늘</h3>
            <ul className={sidemenuListsBox}>
              <SidemenuList iconSrc={sidemenu_list} text="최근 가장 인기있는 여성 운동화" />
              <SidemenuList iconSrc={sidemenu_list} text="비오는 날 신기 좋은 레인부츠 추천" />
            </ul>
            <h3 className={sidemenuListsTitle}>지난 7일</h3>
            <ul className={sidemenuListsBox}>
              <SidemenuList iconSrc={sidemenu_list} text="여름 슬리퍼 추천" />
              <SidemenuList iconSrc={sidemenu_list} text="가벼운 러닝화" />
              <SidemenuList iconSrc={sidemenu_list} text="20대 여성이 많이 찾는 브랜드" />
            </ul>
          </article>
          {/* mypage 링크 또는 로그인 버튼 */}
          <article className={sidemenuMypageMoveContainer}>
            {isLoggedIn ? <SidemenuMypageLinks /> : <Button onClick={handleLoginClick} text="로그인" width="100%" />}
          </article>
        </div>
      </section>
    </>
  );
};

export default SideMenu;
