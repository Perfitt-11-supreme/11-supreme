import { infoContainer, infoIcon, infoTextbox } from './infoBox.css';

const InfoBox = () => {
  return (
    <div className={infoContainer}>
      <div className={infoIcon} />
      <div className={infoTextbox}>
        나에게 편한 신발 사이즈를 고려해서 추천사이즈를 알려드리기 위해 평소 신는 스니커즈 사이즈를 받고 있어요.
      </div>
    </div>
  );
};

export default InfoBox;
