import { useEffect } from 'react';
import { foot_loading } from '../../assets/assets';
import { responsiveBox } from '../../styles/responsive.css';
import Button from '../common/button/Button';
import Header from '../empty-shoes-room/header/Header';
import { bigP, buttonDiv, container, imgDiv, smallP } from './foot-info.css';

const FootInfo = () => {


  useEffect(() => {
    const win = window as any;
    if (win.initializePerfittSize) {
      win.initializePerfittSize();
    } else {
      console.error('에러..에러어어어어ㅓ~');
    }
  }, []);



  return (

    <div className={responsiveBox}>

      <div className={container}>
        <Header title="내 발 정보" />
        <div className={imgDiv}>
          <img src={foot_loading} alt="foot_loading" style={{ width: '284px' }} />
        </div>
        <p className={bigP}>발 정보가 아직 없습니다</p>
        <p className={smallP}>발 촬영으로 내 발 리포트를 받아보세요.</p>
        <div className={buttonDiv} >
          <Button text="내 발 측정하기" id='perfitt_size_button' />
        </div>
      </div>
    </div>

  );
};

export default FootInfo;
