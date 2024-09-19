import {
  back_arrow,
  mypage_arrow,
  mypage_heart,
  mypage_shose_room,
  user_profile,
  user_profile_upload,
} from '../../assets/assets';
import Header from '../../components/common/header/Header';
import { responsiveBox } from '../../styles/responsive.css';
import {
  mypageContainer,
  userProfileGreetingContainer,
  userProfileGreeting,
  userProfileIconBox,
  userProfileImageContainer,
  userProfileName,
  userProfileUploadIconBox,
  userProfileNameTextBold,
  borderLine,
  mypageButton,
  mypageButtonBox,
  mypageButtonIcon,
  myInfoContainer,
  myInfoTitle,
  myInfoBox,
  myInfoKey,
  myInfoValue,
  myInfoServiceButton,
  myInfoServiceBox,
  myInfoServiceTermBox,
  myInfoServiceTermButton,
} from './mypage.css';

const Mypage = () => {
  return (
    <>
      <div className={responsiveBox}>
        <section className={mypageContainer}>
          <Header imageSrc={back_arrow} alt="back arrow" />
          <article className={userProfileImageContainer}>
            <div className={userProfileIconBox}>
              <img src={user_profile} alt="user_profile" />
              <div className={userProfileUploadIconBox}>
                <img src={user_profile_upload} alt="user_profile_upload" />
              </div>
            </div>
          </article>
          <article className={userProfileGreetingContainer}>
            <p className={userProfileGreeting}>안녕하세요!</p>
            <p className={userProfileName}>
              <span className={userProfileNameTextBold}>김&nbsp;이&nbsp;름&nbsp;</span>님
            </p>
          </article>
          <article>
            <hr className={borderLine} />
            <div className={mypageButtonBox}>
              <button className={mypageButton} type="button">
                <img className={mypageButtonIcon} src={mypage_heart} alt="mypage_heart" />
                <span>좋아요</span>
              </button>
              <button className={mypageButton} type="button">
                <img className={mypageButtonIcon} src={mypage_shose_room} alt="mypage_shose_room" />
                <span>신발장</span>
              </button>
            </div>
            <hr className={borderLine} />
          </article>
          <article className={myInfoContainer}>
            <h3 className={myInfoTitle}>내 정보</h3>
            <div className={myInfoBox}>
              <div className={myInfoKey}>
                <p>이름</p>
                <p>성별</p>
                <p>생년월일</p>
                <p>평소사이즈</p>
              </div>
              <div className={myInfoValue}>
                <p>김이름</p>
                <p>여</p>
                <p>1999.10.11</p>
                <p>235mm</p>
              </div>
            </div>
          </article>
          <article>
            <hr className={borderLine} />
            <div className={myInfoServiceBox}>
              <div className={myInfoServiceButton}>
                <span>내 정보 수정</span>
                <img src={mypage_arrow} alt="mypage_arrow" />
              </div>
              <div className={myInfoServiceButton}>
                <span>비밀번호 변경</span>
                <img src={mypage_arrow} alt="mypage_arrow" />
              </div>
              <div className={myInfoServiceButton}>
                <span>고객센터</span>
                <img src={mypage_arrow} alt="mypage_arrow" />
              </div>
            </div>
            <div className={myInfoServiceTermBox}>
              <div className={myInfoServiceTermButton}>회원탈퇴</div>
              <div className={myInfoServiceTermButton}>고객약관</div>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default Mypage;
