import { useState } from 'react';
import { again } from '../../../../../../assets/assets';
import Button from '../../../../../common/button/Button';
import {
  Product_AgainBox,
  Product_AgainContainder,
  Product_AgainIcon,
  Product_AgainText,
  Product_ProductBrand,
  Product_ProductImage,
  Product_ProductInfo,
  Product_ProductName,
  Product_ScrollableContent,
  Product_Similar,
  Product_SimilarProductButton,
  Product_SimilarProductContainer,
  Product_SimilarText,
  Product_SuccesContainer,
} from './succesproduct.css';
import ItemCard from '../../../../itemcard/ItemCard';
import useImageSearchStore from '../../../../../../stores/useImageSearchStore';
import { ImageShoseSearchAPI } from '../../../../../../api/searchRequests';
import { useMutation } from '@tanstack/react-query';
import { ProductData } from '../../../../../../types/data';
import useProductStore from '../../../../../../stores/useProductStroe';

const SuccesProduct = () => {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const { isSimilar, setIsState, capturedImage, brand, modelName, handleClickAgain } = useImageSearchStore();
  const { setData, getData } = useProductStore();

  const handleImageSearchPost = useMutation({
    mutationFn: (data: string) => ImageShoseSearchAPI(data),
    onSuccess: response => {
      console.log('키워드 전송 성공');

      const products: ProductData[] = response.data.products;
      setData({ getData: products });
      setIsState({ isSimilar: true });
    },
    onError: error => {
      console.error('이미지 서칭 실패:', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨');
    },
  });

  const handleClickSimilar = () => {
    handleImageSearchPost.mutate(capturedImage!);
  };

  const handleClickItemCard = (index: number) => {
    setIsSelected(index);
  };
  return (
    <>
      {isSimilar ? (
        <>
          <div className={Product_SimilarProductContainer}>
            <div className={Product_ScrollableContent}>
              {getData!.map((_, index) => (
                <ItemCard
                  key={index}
                  index={index}
                  isSelected={isSelected}
                  handleClickItemCard={handleClickItemCard}
                  data={getData![index]}
                />
              ))}
            </div>
            <div className={Product_SimilarProductButton}>
              <Button text="선택 완료"></Button>
            </div>
          </div>
        </>
      ) : (
        <div className={Product_SuccesContainer}>
          <div className={Product_AgainContainder}>
            <div className={Product_AgainBox} onClick={() => handleClickAgain()}>
              <img className={Product_AgainIcon} src={again} alt="again" />
              <p className={Product_AgainText}>다시하기</p>
            </div>
          </div>
          <div
            className={Product_Similar}
            onClick={() => {
              handleClickSimilar();
            }}
          >
            <p className={Product_SimilarText}>비슷한 상품 더보기</p>
          </div>
          <img className={Product_ProductImage} src={capturedImage!} alt="shoes_w159" />
          <div className={Product_ProductInfo}>
            <p className={Product_ProductBrand}>{brand}</p>
            <p className={Product_ProductName}>{modelName}</p>
          </div>
          <Button text="선택 완료"></Button>
        </div>
      )}
    </>
  );
};
export default SuccesProduct;
