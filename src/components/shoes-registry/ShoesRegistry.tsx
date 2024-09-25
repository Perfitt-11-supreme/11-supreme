import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useShoesRegistryStore } from '../../stores/useRegistryStore';
import { plus } from '../../assets/assets';
import Choose from '../empty-shoes-room/choose/Choose';
import StarRating from './star-rating/StarRating';
import Header from '../empty-shoes-room/header/Header';
import Button from '../common/button/Button';
import Slider from '../slider/Slider';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
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
  errorText,
  hookForm,
} from './shoesregistry.css';
import ItemCard from '../choose-shose/itemcard/ItemCard';
import useSelectItemStore from '../../stores/useSelectItemStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Errors, ShoeData, User } from '../../types/registry';
import { useForm } from 'react-hook-form';

const auth = getAuth();
const user = auth.currentUser;

const ShoesRegistry = () => {
  console.log('렌더링됨');
  const { shoesId } = useParams<{ shoesId: string }>();
  const { selectProduct, selectComplet, setSelectProduct } = useSelectItemStore();
  const navigate = useNavigate();
  const ratingRef = useRef<HTMLDivElement>(null);
  const lengthRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);
  const soleRef = useRef<HTMLDivElement>(null);
  const weightRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShoeData>();
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
    setRecommendation,
  } = useShoesRegistryStore();

  const [editData, setEditData] = useState<ShoeData | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const isUser = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => isUser();
  }, []);

  const fetchShoeInfo = useCallback(async () => {
    if (shoesId) {
      try {
        const docSnap = await getDoc(doc(db, 'myshoes', shoesId));
        if (docSnap.exists()) {
          const data = docSnap.data() as ShoeData;
          console.log('Fetched data:', data);
          setEditData(data);

          // 폼에 데이터 채우기
          setSelectProduct({
            image: data.image || '',
            brand: data.brand || '',
            modelName: data.modelName || '',
          });
          setRating(data.rating);
          setLength(data.length);
          setWidth(data.width);
          setHeight(data.height);
          setSole(data.sole);
          setWeight(data.weight);
          setReview(data.review);
          setRecommendation(data.recommendation);
        } else {
          console.log('해당 문서가 없습니다.');
        }
      } catch (e) {
        console.error('문서를 가져오는 중 오류 발생: ', e);
      }
    }
  }, [
    shoesId,
    setSelectProduct,
    setRating,
    setLength,
    setWidth,
    setHeight,
    setSole,
    setWeight,
    setReview,
    setRecommendation,
  ]);

  useEffect(() => {
    fetchShoeInfo();
  }, [shoesId]);

  const saveToFirestore = useCallback(
    async (data: ShoeData) => {
      try {
        const dataWithUid = { ...data, uid: user?.uid };

        if (shoesId) {
          // 신발 정보 수정
          const shoeDocRef = doc(db, 'myshoes', shoesId);
          await updateDoc(shoeDocRef, dataWithUid);
          console.log('db 수정 성공 ID: ', shoesId);
        } else {
          // 신발 정보 저장
          const docRef = await addDoc(collection(db, 'myshoes'), dataWithUid);
          console.log('db 저장 성공 ID: ', docRef.id);
        }
      } catch (e) {
        console.error('db 저장/수정 에러: ', e);
      }
    },
    [shoesId, user]
  );

  const handleFormSubmit = async (data: ShoeData) => {
    if (!user) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    const shoeData: ShoeData = {
      ...selectProduct,
      rating,
      length,
      width,
      height,
      sole,
      weight,
      recommendation,
      review: data.review,
      timestamp: Timestamp.now(),
    };
    setReview(data.review);

    await saveToFirestore(shoeData);

    // 완료 폼 초기화
    setSelectProduct(null);
    setRating(0);
    setLength('');
    setWidth('');
    setHeight('');
    setSole('');
    setWeight('');
    setRecommendation('');
    setReview('');

    if (shoesId) {
      navigate('/empty-shoesroom', { state: { editToastMessage: '수정 되었습니다' } });
    } else {
      navigate('/empty-shoesroom', { state: { registryToastMessage: '등록 되었습니다' } });
    }
  };
  const handleError = (errors: any) => {
    const firstErrorKey = Object.keys(errors)[0];
    const refMap: any = {
      rating: ratingRef,
      length: lengthRef,
      width: widthRef,
      height: heightRef,
      sole: soleRef,
      weight: weightRef,
      review: reviewRef,
    };

    refMap[firstErrorKey]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleChooseShoes = () => navigate('/text-search');

  const handleBack = () => {
    // 뒤로 나갈 경우 폼 초기화
    setSelectProduct(null);
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

  useEffect(() => {
    setValue('review', review);
  }, [review, setValue]);

  return (
    <>
      <div className={container}>
        <Header title="신발 등록" customNavigate={handleBack} />
        <p className={descP}>신발을 선택해 주세요</p>
        {selectComplet && selectProduct !== null ? (
          <button className={imagePlusButtonSelected} onClick={handleChooseShoes} disabled={!!shoesId}>
            <div className={itemCardDiv}>
              <ItemCard index={0} data={selectProduct} />
            </div>
          </button>
        ) : (
          <button className={imagePlusButton} onClick={handleChooseShoes}>
            <img src={plus} alt="등록" />
          </button>
        )}

        <p className={questionP}>신발은 마음에 드셨나요?</p>
        <p className={starP}>별점을 눌러 만족도를 알려주세요</p>
        <form className={hookForm} onSubmit={handleSubmit(handleFormSubmit, handleError)}>
          <div ref={ratingRef}>
            <StarRating />
          </div>
          {errors.rating && <p className={errorText}>{errors.rating.message}</p>}

          <p className={questP}>신발 길이가 잘 맞나요?</p>
          <div ref={lengthRef}>
            <Choose
              {...register('length', { required: length === '' && '신발 길이를 선택해 주세요' })}
              groupName="length"
              options={[
                { id: 'length1', label: '짧아요' },
                { id: 'length2', label: '잘 맞아요' },
                { id: 'length3', label: '길어요' },
              ]}
              selectedOption={length}
              setter={setLength}
            />
            {errors.length && <p className={errorText}>{errors.length.message}</p>}
          </div>

          <p className={questP}>발볼 너비가 잘 맞나요?</p>
          <div ref={widthRef}>
            <Choose
              {...register('width', { required: width === '' && '발볼 너비를 선택해 주세요' })}
              groupName="width"
              options={[
                { id: 'width1', label: '좁아요' },
                { id: 'width2', label: '잘 맞아요' },
                { id: 'width3', label: '넓어요' },
              ]}
              selectedOption={width}
              setter={setWidth}
            />
            {errors.width && <p className={errorText}>{errors.width.message}</p>}
          </div>

          <p className={questP}>발등 높이는 어떤가요?</p>
          <div ref={heightRef}>
            <Choose
              {...register('height', { required: height === '' && '발등 높이를 선택해 주세요' })}
              groupName="height"
              options={[
                { id: 'height1', label: '타이트해요' },
                { id: 'height2', label: '적당해요' },
                { id: 'height3', label: '넉넉해요' },
              ]}
              selectedOption={height}
              setter={setHeight}
            />
            {errors.height && <p className={errorText}>{errors.height.message}</p>}
          </div>

          <p className={questP}>밑창은 푹신한가요?</p>
          <div ref={soleRef}>
            <Choose
              {...register('sole', { required: sole === '' && '밑창 상태를 선택해 주세요' })}
              groupName="sole"
              options={[
                { id: 'sole1', label: '딱딱해요' },
                { id: 'sole2', label: '적당해요' },
                { id: 'sole3', label: '푹신해요' },
              ]}
              selectedOption={sole}
              setter={setSole}
            />
            {errors.sole && <p className={errorText}>{errors.sole.message}</p>}
          </div>

          <p className={questP}>신발 무게는 어떤가요?</p>
          <div ref={weightRef}>
            <Choose
              {...register('weight', { required: weight === '' && '신발 무게를 선택해 주세요' })}
              groupName="weight"
              options={[
                { id: 'weight1', label: '가벼워요' },
                { id: 'weight2', label: '적당해요' },
                { id: 'weight3', label: '무거워요' },
              ]}
              selectedOption={weight}
              setter={setWeight}
            />
            {errors.weight && <p className={errorText}>{errors.weight.message}</p>}
          </div>

          <p className={questP}>이 신발의 추천 사이즈는 무엇인가요?</p>
          <Slider />
          <p className={questP}>자세한 사용기를 적어주세요.</p>
          {errors.review && <p className={errorText}>{errors.review.message}</p>}
          {/* <div ref={reviewRef}> */}
          <textarea
            {...register('review', { required: '리뷰를 작성해 주세요' })}
            className={area}
            placeholder="이 신발을 신으면서 느꼈던 장점 및 단점을 솔직하게 알려주세요."
          />
          <div className={buttonDiv}>
            <Button type="submit" text={shoesId ? '수정 완료' : '입력 완료'} />
          </div>
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default React.memo(ShoesRegistry);
