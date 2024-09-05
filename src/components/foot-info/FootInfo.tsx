import { useNavigate } from 'react-router-dom';
import { my_foot } from '../../assets/assets';
import Button from '../common/button/Button';
import Header from '../empty-shoes-room/header/Header';
import { bigP, buttonDiv, container, imgDiv, smallP } from './foot-info.css';

const FootInfo = () => {
  const navigate = useNavigate();
  const handlePageMove = () => {
    navigate('/myFootInfo');
  };

  return (
    <div className={container}>
      <Header title="내 발 정보" />
      <div className={imgDiv}>
        <img src={my_foot} alt="" />
      </div>
      <p className={bigP}>발 정보가 아직 없습니다</p>
      <p className={smallP}>발 촬영으로 내 발 리포트를 받아보세요.</p>
      <div className={buttonDiv}>
        <Button text="내 발 측정하기" onClick={handlePageMove} />
      </div>
    </div>
  );
};
export default FootInfo;
