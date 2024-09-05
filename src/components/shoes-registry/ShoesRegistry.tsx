import { useState } from 'react';
import { plus } from '../../assets/assets';
import Choose from '../empty-shoes-room/choose/Choose';
import Slider from '../slider/Slider';
import StarRating from './star-rating/StarRating';
import Header from '../empty-shoes-room/header/Header';
import Button from '../common/button/Button';
import { area, buttonDiv, container, descP, imagePlusButton, questionP, questP, starP } from './shoesregistry.css';

const ShoesRegistry = () => {
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedWidth, setSelectedWidth] = useState('');
  const [selectedHeight, setSelectedHeight] = useState('');
  const [selectedSole, setSelectedSole] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');

  const handleChangeFactory =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.id);
    };

  return (
    <div className={container}>
      <Header title="신발 등록" />
      <p className={descP}>신발을 선택해 주세요</p>
      <button className={imagePlusButton}>
        <img src={plus} alt="등록" />
      </button>
      <p className={questionP}>신발은 마음에 드셨나요?</p>
      <p className={starP}>별점을 눌러 만족도를 알려주세요</p>
      <div>
        <StarRating />
      </div>

      <p className={questP}>신발 길이가 잘 맞나요?</p>
      <Choose
        groupName="length"
        options={[
          { id: 'option1', label: '짧아요' },
          { id: 'option2', label: '잘 맞아요' },
          { id: 'option3', label: '길어요' },
        ]}
        selectedOption={selectedLength}
        handleChange={handleChangeFactory(setSelectedLength)}
      />

      <p className={questP}>발볼 너비가 잘 맞나요?</p>
      <Choose
        groupName="width"
        options={[
          { id: 'option21', label: '좁아요' },
          { id: 'option22', label: '잘 맞아요' },
          { id: 'option23', label: '넓어요' },
        ]}
        selectedOption={selectedWidth}
        handleChange={handleChangeFactory(setSelectedWidth)}
      />

      <p className={questP}>발등 높이는 어떤가요?</p>
      <Choose
        groupName="height"
        options={[
          { id: 'option31', label: '타이트해요' },
          { id: 'option32', label: '적당해요' },
          { id: 'option33', label: '넉넉해요' },
        ]}
        selectedOption={selectedHeight}
        handleChange={handleChangeFactory(setSelectedHeight)}
      />

      <p className={questP}>밑창은 푹신한가요?</p>
      <Choose
        groupName="sole"
        options={[
          { id: 'option41', label: '딱딱해요' },
          { id: 'option42', label: '적당해요' },
          { id: 'option43', label: '푹신해요' },
        ]}
        selectedOption={selectedSole}
        handleChange={handleChangeFactory(setSelectedSole)}
      />

      <p className={questP}>신발 무게는 어떤가요?</p>
      <Choose
        groupName="weight"
        options={[
          { id: 'option51', label: '가벼워요' },
          { id: 'option52', label: '적당해요' },
          { id: 'option53', label: '무거워요' },
        ]}
        selectedOption={selectedWeight}
        handleChange={handleChangeFactory(setSelectedWeight)}
      />
      <p className={questP}>이 신발의 추천 사이즈는 무엇인가요?</p>
      <Slider />
      <p className={questP}>자세한 사용기를 적어주세요.</p>
      <textarea className={area} placeholder="이 신발을 신으면서 느꼈던 장점 및 단점을 솔직하게 알려주세요."></textarea>
      <div className={buttonDiv}>
        <Button text="입력 완료" />
      </div>
    </div>
  );
};

export default ShoesRegistry;
