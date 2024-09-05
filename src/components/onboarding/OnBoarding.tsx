import { useNavigate } from 'react-router-dom';
import { onboarding1 } from '../../assets/assets';
import Button from '../common/button/Button';
import { buttonDiv, container, descP } from './onboarding.css';

const OnBoarding = () => {
  const navigate = useNavigate();

  const handlePageMove = () => {
    navigate('/onBoarding2');
  };
  return (
    <div className={container}>
      <p className={descP}>
        AI에게 질문만으로
        <br />
        원하는 신발을 찾아보세요!
      </p>
      <div>
        <img src={onboarding1} alt="" />
      </div>
      <div className={buttonDiv}>
        <Button text="다음" onClick={handlePageMove} />
      </div>
    </div>
  );
};
export default OnBoarding;
