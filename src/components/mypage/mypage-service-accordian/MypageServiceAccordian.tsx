import { useState } from 'react';
import { mypage_arrow } from '../../../assets/assets';
import Contact from './contact/Contact';
import EditPassword from './edit-password/EditPassword';
import EditUser from './edit-user/EditUser';
import { myInfoServiceButton } from './mypageServiceAccordian.css';

const MypageServiceAccordian = () => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* 내 정보 수정 */}
      <div className={myInfoServiceButton} onClick={() => setIsEditUserOpen(!isEditUserOpen)}>
        <span>내 정보 수정</span>
        <img
          src={mypage_arrow}
          alt="mypage_arrow"
          style={{ transform: isEditUserOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        />
      </div>
      <section
        style={{
          maxHeight: isEditUserOpen ? '200px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-out',
        }}
      >
        <EditUser />
      </section>

      {/* 비밀번호 변경 */}
      <div className={myInfoServiceButton} onClick={() => setIsEditPasswordOpen(!isEditPasswordOpen)}>
        <span>비밀번호 변경</span>
        <img
          src={mypage_arrow}
          alt="mypage_arrow"
          style={{
            transform: isEditPasswordOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>
      <section
        style={{
          maxHeight: isEditPasswordOpen ? '200px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-out',
        }}
      >
        <EditPassword />
      </section>

      {/* 고객센터 */}
      <div className={myInfoServiceButton} onClick={() => setIsContactOpen(!isContactOpen)}>
        <span>고객센터</span>
        <img
          src={mypage_arrow}
          alt="mypage_arrow"
          style={{ transform: isContactOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        />
      </div>
      <section
        style={{
          maxHeight: isContactOpen ? '200px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-out',
        }}
      >
        <Contact />
      </section>
    </>
  );
};

export default MypageServiceAccordian;
