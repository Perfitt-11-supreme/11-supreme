import React from 'react';
import { useShoesRegistryStore } from '../../stores/useRegistryStore';
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

const ShoesInfo = () => {
  const { rating, length, width, height, sole, weight, recommendation, review, selectedItem } = useShoesRegistryStore();

  return (
    <div className={container}>
      <Header title="신발 등록" />
      <div className={imgDiv}>{selectedItem ? <img src={selectedItem.image} /> : '이미지 없음'}</div>
      <div className={infoDiv}>
        <div className={starDiv}>
          <img src={filled_star} alt="별점" />
          <p className={ratingP}>{rating}</p>
        </div>
        <div>
          <p className={brandP}>{selectedItem?.brand || '브랜드'}</p>
          <p className={shoesP}>{selectedItem?.shoesName || '신발 이름'}</p>
        </div>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>신발 길이</p>
        <p className={labelP}>{length}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>발볼 너비</p>
        <p className={labelP}> {width}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>발등 높이</p>
        <p className={labelP}> {height}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>밑창 </p>
        <p className={labelP}>{sole}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>무게 </p>
        <p className={labelP}>{weight}</p>
      </div>
      <div className={infoDiv}>
        <p className={infoP}>사이즈 추천 </p>
        <p className={labelP}>{recommendation}</p>
      </div>
      <div className={reviewDiv}>
        <p className={infoP}>리뷰</p> <p className={reviewP}>{review}</p>
      </div>
    </div>
  );
};

export default ShoesInfo;
