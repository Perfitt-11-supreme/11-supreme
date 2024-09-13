import React, { useEffect, useState } from 'react';
import {
  brandP,
  container,
  imgDiv,
  infoDiv,
  infoP,
  labelP,
  ratingP,
  reviewDiv,
  reviewP,
  shoesP,
  starDiv,
} from './shoes-info.css';
import Header from '../empty-shoes-room/header/Header';
import { filled_star } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const ShoesInfo = () => {
  const [shoeData, setShoeData] = useState<any>(null);
  const { shoesId } = useParams(); // URL 파라미터에서 ID 가져오기

  useEffect(() => {
    const fetchShoeInfo = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'myshoes', shoesId as string));

        if (docSnap.exists()) {
          setShoeData(docSnap.data()); // 데이터를 상태로 저장
          console.log('data: ', shoeData);
        } else {
          console.log('해당 문서가 없습니다');
        }
      } catch (e) {
        console.error('문서를 가져오는 중 오류 발생: ', e);
      }
    };

    fetchShoeInfo();
  }, [shoesId]);

  return (
    <div className={container}>
      <Header title="신발 정보" />
      <div className={imgDiv}>
        {shoeData && shoeData.selectedItem ? (
          <img src={shoeData?.selectedItem?.image} alt="신발 이미지" />
        ) : (
          '이미지 없음'
        )}
      </div>
      <div className={infoDiv}>
        <div className={starDiv}>
          <img src={filled_star} alt="별점" />
          <p className={ratingP}>{shoeData?.rating || '0'}</p>
        </div>
        <div>
          <p className={brandP}>{shoeData?.brand || '브랜드 정보 없음'}</p>
          <p className={shoesP}>{shoeData?.shoesName || '신발 이름 없음'}</p>
        </div>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>신발 길이</p>
        <p className={labelP}>{shoeData?.length || '정보 없음'}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>발볼 너비</p>
        <p className={labelP}>{shoeData?.width || '정보 없음'}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>발등 높이</p>
        <p className={labelP}>{shoeData?.height || '정보 없음'}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>밑창</p>
        <p className={labelP}>{shoeData?.sole || '정보 없음'}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>무게</p>
        <p className={labelP}>{shoeData?.weight || '정보 없음'}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>사이즈 추천</p>
        <p className={labelP}>{shoeData?.recommendation || '추천 정보 없음'}</p>
      </div>
      <div className={reviewDiv}>
        <p className={infoP}>리뷰</p>
        <p className={reviewP}>{shoeData?.review || '리뷰 없음'}</p>
      </div>
    </div>
  );
};

export default ShoesInfo;
