import { useState } from 'react';
import { mypage_arrow } from '../../../assets/assets';
import Contact from './contact/Contact';
import { myInfoServiceButton, myInfoServiceAccordianContainer } from './mypageServiceButton.css';
import { useNavigate } from 'react-router-dom';

const MypageServiceButton = () => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleNavigateEditUser = () => {
    navigate('/edituser');
  };
  const handleNavigateEditPassword = () => {
    navigate('/editpassword');
  };

  return (
    <>
      {/* 내 정보 수정 */}
      <div className={myInfoServiceButton} onClick={handleNavigateEditUser}>
        <span>내 정보 수정</span>
        <img src={mypage_arrow} alt="mypage_arrow" />
      </div>

      {/* 비밀번호 변경 */}
      <div className={myInfoServiceButton} onClick={handleNavigateEditPassword}>
        <span>비밀번호 변경</span>
        <img src={mypage_arrow} alt="mypage_arrow" />
      </div>

      {/* 고객센터 */}
      <div className={myInfoServiceButton} onClick={() => setIsContactOpen(!isContactOpen)}>
        <span>고객센터</span>
        <img
          src={mypage_arrow}
          alt="mypage_arrow"
          style={{ transform: isContactOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        />
      </div>
      {/* 고객센터 - 아코디언 */}
      <section
        style={{
          maxHeight: isContactOpen ? '216.26px' : '0px',
        }}
        className={myInfoServiceAccordianContainer}
      >
        <Contact />
      </section>
    </>
  );
};

export default MypageServiceButton;
