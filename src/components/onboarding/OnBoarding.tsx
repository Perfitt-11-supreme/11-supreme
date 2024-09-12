import { useNavigate } from 'react-router-dom';
import { onboarding1, onboarding2 } from '../../assets/assets';
import Button from '../common/button/Button';
import { buttonDiv, container, descP, slide, slide0, slide1, slidesWrapper } from './onboarding.css';
import { useState } from 'react';

const OnBoarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handlePageMove = () => {
    navigate('/onboarding2');
  };

  const handleNextSlide = () => {
    if (currentSlide < 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className={container}>
      <div className={`${slidesWrapper} ${currentSlide === 0 ? slide0 : slide1}`}>
        <div className={slide}>
          <p className={descP}>
            AI에게 질문만으로
            <br />
            원하는 신발을 찾아보세요!
          </p>
          <div>
            <img src={onboarding1} alt="onboarding1" />
          </div>
          <div className={buttonDiv}>
            <Button text="다음" onClick={handleNextSlide} />
          </div>
        </div>
        <div className={slide}>
          <p className={descP}>
            발 촬영하면 원하는 신발의
            <br />딱 맞는 사이즈를 추천해드려요.
          </p>
          <div>
            <img src={onboarding2} alt="" />
          </div>
          <div className={buttonDiv}>
            <Button text="시작하기" onClick={handlePageMove} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnBoarding;
