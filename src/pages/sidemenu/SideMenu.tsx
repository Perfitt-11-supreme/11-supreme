import { hamburger_menu, sidemenu_list, sidemenu_plus, user_profile } from '../../assets/assets';
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
  sidemenuListIcon,
  sidemenuListText,
  sidemenuListBox,
  sidemenuMypageMoveButton,
  sidemenuMypageLine,
  sidemenuMypageMoveContainer,
  sidemenuUserProfileIcon,
  sidemenuUserProfileText,
  sidemenuUserProfileBox,
  sidemenuUserProfileButton,
} from './sidemenu.css';

const SideMenu = () => {
  return (
    <>
      <section className={sidemenuDimmed}>
        <div className={sidemenuContainer}>
          {/* 헤더 */}
          <article className={sidemenuHeaderContainer}>
            <button className={hamburgerIconBox}>
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
              <li className={sidemenuListBox}>
                <img className={sidemenuListIcon} src={sidemenu_list} alt="sidemenu_list" />
                <div className={sidemenuListText}>최근 가장 인기있는 여성 운동화</div>
              </li>
              <li className={sidemenuListBox}>
                <img className={sidemenuListIcon} src={sidemenu_list} alt="sidemenu_list" />
                <div className={sidemenuListText}>비오는 날 신기 좋은 레인부츠 추천</div>
              </li>
            </ul>
            <h3 className={sidemenuListsTitle}>지난 7일</h3>
            <ul className={sidemenuListsBox}>
              <li className={sidemenuListBox}>
                <img className={sidemenuListIcon} src={sidemenu_list} alt="sidemenu_list" />
                <div className={sidemenuListText}>여름 슬리퍼 추천</div>
              </li>
              <li className={sidemenuListBox}>
                <img className={sidemenuListIcon} src={sidemenu_list} alt="sidemenu_list" />
                <div className={sidemenuListText}>가벼운 러닝화</div>
              </li>
              <li className={sidemenuListBox}>
                <img className={sidemenuListIcon} src={sidemenu_list} alt="sidemenu_list" />
                <div className={sidemenuListText}>20대 여성이 많이 찾는 브랜드</div>
              </li>
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
