import { useEffect } from 'react';
import { hamburger_menu, sidemenu_list, sidemenu_plus, user_profile } from '../../assets/assets';
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
  sidemenuMypageMoveButton,
  sidemenuMypageLine,
  sidemenuMypageMoveContainer,
  sidemenuUserProfileIcon,
  sidemenuUserProfileText,
  sidemenuUserProfileBox,
  sidemenuUserProfileButton,
} from './sidemenu.css';

type SideMenuProps = {
  onClose: () => void;
};

const SideMenu = ({ onClose }: SideMenuProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
            <button className={plusButtonBox}>
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
          {/* mypage 링크 */}
          <article className={sidemenuMypageMoveContainer}>
            <hr className={sidemenuMypageLine} />
            <div>
              <button className={sidemenuMypageMoveButton}>좋아요</button>
              <span>|</span>
              <button className={sidemenuMypageMoveButton}>최근 본</button>
            </div>
            <div>
              <button className={sidemenuMypageMoveButton}>신발장</button>
            </div>
            <div>
              <button className={sidemenuMypageMoveButton}>내 발 정보</button>
            </div>
            <hr className={sidemenuMypageLine} />

            <div className={sidemenuUserProfileBox}>
              <button className={sidemenuUserProfileButton}>
                <img className={sidemenuUserProfileIcon} src={user_profile} alt="user_profile" />
                <span className={sidemenuUserProfileText}>김펄핏</span>
              </button>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default SideMenu;
