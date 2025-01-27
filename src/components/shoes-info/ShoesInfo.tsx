import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { filled_star } from '../../assets/assets';
import { db } from '../../firebase/firebase';
import Header from '../empty-shoes-room/header/Header';
import {
  brandP,
  container,
  imageSize,
  imgDiv,
  infoDiv,
  infoP,
  labelP,
  ratingP,
  reviewDiv,
  reviewP,
  shoesP,
  starDiv,
} from './shoesInfo.css';

const ShoesInfo = () => {
  const [shoeData, setShoeData] = useState<any>(null);
  const { shoesId } = useParams(); // URL 파라미터에서 ID 가져오기

  useEffect(() => {
    const fetchShoeInfo = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'myshoes', shoesId as string));
        if (docSnap.exists()) {
          const data = docSnap.data();
          // console.log('Fetched shoe data: ', data); // 데이터 구조 확인
          setShoeData(data); // 데이터를 상태로 저장
        } else {
          console.error('해당 문서가 없습니다');
        }
      } catch (e) {
        console.error('문서를 가져오는 중 오류 발생: ', e);
      }
    };

    fetchShoeInfo();
  }, [shoesId]);

  useEffect(() => {
    if (shoeData?.image) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = shoeData.image;
      link.as = 'image';
      document.head.appendChild(link);
    }
  }, [shoeData]);
  return (
    <>
      <div className={container}>
        <Header title="신발 정보" />
        <div className={imgDiv}>{shoeData && <img src={shoeData.image} alt="신발 이미지" className={imageSize} />}</div>
        <div className={infoDiv}>
          <div className={starDiv}>
            <img src={filled_star} alt="별점" />
            <p className={ratingP}>{shoeData?.rating}</p>
          </div>
          <div>
            <p className={brandP}>{shoeData?.brand}</p>
            <p className={shoesP}>{shoeData?.modelName}</p>
          </div>
        </div>
        <div className={infoDiv}>
          <p className={infoP}>신발 길이</p>
          <p className={labelP}>{shoeData?.length}</p>
        </div>
        <div className={infoDiv}>
          <p className={infoP}>발볼 너비</p>
          <p className={labelP}>{shoeData?.width}</p>
        </div>
        <div className={infoDiv}>
          <p className={infoP}>발등 높이</p>
          <p className={labelP}>{shoeData?.height}</p>
        </div>
        <div className={infoDiv}>
          <p className={infoP}>밑창</p>
          <p className={labelP}>{shoeData?.sole}</p>
        </div>
        <div className={infoDiv}>
          <p className={infoP}>무게</p>
          <p className={labelP}>{shoeData?.weight}</p>
        </div>
        <div className={infoDiv}>
          <p className={infoP}>사이즈 추천</p>
          <p className={labelP}>{shoeData?.recommendation}</p>
        </div>
        <div className={reviewDiv}>
          <p className={infoP}>리뷰</p>
          <p className={reviewP}>{shoeData?.review}</p>
        </div>
      </div>
    </>
  );
};

export default ShoesInfo;
