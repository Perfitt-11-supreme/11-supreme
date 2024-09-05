import { hamburger_menu, sidemenu_plus } from '../../assets/assets';
import {
  hamburgerIconBox,
  sidemenuHeaderContainer,
  sidemenuDimmed,
  sidemenuContainer,
  sidemenuNewChatContainer,
  plusIconBox,
} from './sidemenu.css';

const SideMenu = () => {
  return (
    <>
      <h1>SideMenu Component</h1>
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
            <button className={plusIconBox}>
              <img src={sidemenu_plus} alt="sidemenu_plus" />
              <span>새 채팅</span>
            </button>
          </article>
        </div>
      </section>
    </>
  );
};

export default SideMenu;
