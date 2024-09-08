import React from 'react';
import { useShoesRegistryStore } from '../../stores/useRegistryStore';
import { plus } from '../../assets/assets';
import Choose from '../empty-shoes-room/choose/Choose';
import StarRating from './star-rating/StarRating';
import Header from '../empty-shoes-room/header/Header';
import Button from '../common/button/Button';
import Slider from '../slider/Slider';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../choose-shose/itemcard/ItemCard';
import { useShoesStore } from '../../stores/useShoesStore';
import {
  area,
  buttonDiv,
  container,
  descP,
  imagePlusButton,
  imagePlusButtonSelected,
  itemCardDiv,
  questionP,
  questP,
  starP,
} from './shoesregistry.css';

const ShoesRegistry = () => {
  const { selectedItem } = useShoesStore(state => ({
    selectedItem: state.selectedItem,
  }));
  const {
    length,
    width,
    height,
    sole,
    weight,
    recommendation,
    review,
    setLength,
    setWidth,
    setHeight,
    setSole,
    setWeight,
    setRecommendation,
    setReview,
  } = useShoesRegistryStore();

  const navigate = useNavigate();
  const handleChooseShoes = () => {
    navigate('/text-search');
  };

  const handleSubmit = () => {
    navigate('/shoesinfo');
  };

  return (
    <div className={container}>
      <Header title="신발 등록" />
      {selectedItem === null ? (
        <>
          <p className={descP}>신발을 선택해 주세요</p>
          <button className={imagePlusButton} onClick={handleChooseShoes}>
            <img src={plus} alt="등록" />
          </button>
        </>
      ) : (
        <button className={imagePlusButtonSelected} onClick={handleChooseShoes}>
          <div className={itemCardDiv}>
            <ItemCard index={selectedItem} handleClickItemCard={() => {}} />
          </div>
        </button>
      )}

      <p className={questionP}>신발은 마음에 드셨나요?</p>
      <p className={starP}>별점을 눌러 만족도를 알려주세요</p>
      <div>
        <StarRating />
      </div>

      <p className={questP}>신발 길이가 잘 맞나요?</p>
      <Choose
        groupName="length"
        options={[
          { id: 'length1', label: '짧아요' },
          { id: 'length2', label: '잘 맞아요' },
          { id: 'length3', label: '길어요' },
        ]}
        selectedOption={length}
        setter={setLength}
      />

      <p className={questP}>발볼 너비가 잘 맞나요?</p>
      <Choose
        groupName="width"
        options={[
          { id: 'width1', label: '좁아요' },
          { id: 'width2', label: '잘 맞아요' },
          { id: 'width3', label: '넓어요' },
        ]}
        selectedOption={width}
        setter={setWidth}
      />

      <p className={questP}>발등 높이는 어떤가요?</p>
      <Choose
        groupName="height"
        options={[
          { id: 'height1', label: '타이트해요' },
          { id: 'height2', label: '적당해요' },
          { id: 'height3', label: '넉넉해요' },
        ]}
        selectedOption={height}
        setter={setHeight}
      />

      <p className={questP}>밑창은 푹신한가요?</p>
      <Choose
        groupName="sole"
        options={[
          { id: 'sole1', label: '딱딱해요' },
          { id: 'sole2', label: '적당해요' },
          { id: 'sole3', label: '푹신해요' },
        ]}
        selectedOption={sole}
        setter={setSole}
      />

      <p className={questP}>신발 무게는 어떤가요?</p>
      <Choose
        groupName="weight"
        options={[
          { id: 'weight1', label: '가벼워요' },
          { id: 'weight2', label: '적당해요' },
          { id: 'weight3', label: '무거워요' },
        ]}
        selectedOption={weight}
        setter={setWeight}
      />

      <p className={questP}>이 신발의 추천 사이즈는 무엇인가요?</p>
      <Slider />

      <p className={questP}>자세한 사용기를 적어주세요.</p>
      <textarea
        className={area}
        placeholder="이 신발을 신으면서 느꼈던 장점 및 단점을 솔직하게 알려주세요."
        value={review}
        onChange={e => setReview(e.target.value)}
      />
      <div className={buttonDiv}>
        <Button text="입력 완료" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ShoesRegistry;
