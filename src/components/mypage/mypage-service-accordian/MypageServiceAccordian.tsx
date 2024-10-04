import { mypage_arrow } from '../../../assets/assets';
import { myInfoServiceButton } from './mypageServiceAccordian.css';

const MypageServiceAccordian = () => {
  return (
    <>
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
    </>
  );
};

export default MypageServiceAccordian;
