import { useShoesRegistryStore } from '../../stores/useRegistryStore';
import { plus } from '../../assets/assets';
import Choose from '../empty-shoes-room/choose/Choose';
import StarRating from './star-rating/StarRating';
import Header from '../empty-shoes-room/header/Header';
import Button from '../common/button/Button';
import Slider from '../slider/Slider';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../choose-shose/itemcard/ItemCard';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
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
import { useRef } from 'react';

const ShoesRegistry = () => {
  const { selectedItem } = useShoesRegistryStore(state => ({
    selectedItem: state.selectedItem,
  }));
  const {
    rating,
    length,
    width,
    height,
    sole,
    weight,
    recommendation,
    review,
    setRating,
    setLength,
    setWidth,
    setHeight,
    setSole,
    setWeight,
    setReview,
    setSelectedItem,
    setRecommendation,
  } = useShoesRegistryStore();

  const saveToFirestore = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, 'myshoes'), data);
      console.log('db 저장 성공 ID: ', docRef.id);
    } catch (e) {
      console.error('db 저장 에러: ', e);
    }
  };

  const navigate = useNavigate();
  const handleChooseShoes = () => {
    navigate('/text-search');
  };

  const chooseShoesRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const lengthRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);
  const soleRef = useRef<HTMLDivElement>(null);
  const weightRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    if (!selectedItem) {
      alert('신발을 선택해 주세요.');
      chooseShoesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!rating) {
      alert('별점을 선택해 주세요.');
      ratingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!length) {
      alert('신발 길이를 선택해 주세요.');
      lengthRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!width) {
      alert('발볼 너비를 선택해 주세요.');
      widthRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!height) {
      alert('발등 높이를 선택해 주세요.');
      heightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!sole) {
      alert('밑창 상태를 선택해 주세요.');
      soleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!weight) {
      alert('신발 무게를 선택해 주세요.');
      weightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!review) {
      alert('리뷰를 작성해 주세요.');
      reviewRef.current?.focus();
      return;
    }
    const data = {
      ...selectedItem,
      rating,
      length,
      width,
      height,
      sole,
      weight,
      recommendation,
      review,
      timestamp: new Date(),
    };

    await saveToFirestore(data);

    setSelectedItem(null);
    setRating(0);
    setLength('');
    setWidth('');
    setHeight('');
    setSole('');
    setWeight('');
    setRecommendation('');
    setReview('');

    navigate('/empty-shoesroom');
  };

  return (
    <div className={container}>
      <Header title="신발 등록" />
      {selectedItem === null ? (
        <div ref={chooseShoesRef}>
          <p className={descP}>신발을 선택해 주세요</p>
          <button className={imagePlusButton} onClick={handleChooseShoes}>
            <img src={plus} alt="등록" />
          </button>
        </div>
      ) : (
        <button className={imagePlusButtonSelected} onClick={handleChooseShoes}>
          <div className={itemCardDiv}>
            <ItemCard index={0} handleClickItemCard={() => {}} />
          </div>
        </button>
      )}

      <p className={questionP}>신발은 마음에 드셨나요?</p>
      <p className={starP}>별점을 눌러 만족도를 알려주세요</p>
      <div ref={ratingRef}>
        <StarRating />
      </div>

      <p className={questP}>신발 길이가 잘 맞나요?</p>
      <div ref={lengthRef}>
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
      </div>

      <p className={questP}>발볼 너비가 잘 맞나요?</p>
      <div ref={widthRef}>
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
      </div>

      <p className={questP}>발등 높이는 어떤가요?</p>
      <div ref={heightRef}>
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
      </div>

      <p className={questP}>밑창은 푹신한가요?</p>
      <div ref={soleRef}>
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
      </div>

      <p className={questP}>신발 무게는 어떤가요?</p>
      <div ref={weightRef}>
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
      </div>

      <p className={questP}>이 신발의 추천 사이즈는 무엇인가요?</p>
      <Slider />
      <p className={questP}>자세한 사용기를 적어주세요.</p>
      <textarea
        ref={reviewRef}
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
