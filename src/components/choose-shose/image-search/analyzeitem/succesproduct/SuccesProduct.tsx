import { useState } from 'react';
import { again } from '../../../../../assets/assets';
import Button from '../../../../common/button/Button';
import {
  Product_AgainBox,
  Product_AgainContainder,
  Product_AgainIcon,
  Product_AgainText,
  Product_ItemCardsContainer,
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
import ItemCard from '../../../itemcard/ItemCard';
import useImageSearchStore from '../../../../../stores/useImageSearchStore';
import { ImageShoseSearchAPI } from '../../../../../api/searchRequests';
import { useMutation } from '@tanstack/react-query';
import { TProduct } from '../../../../../types/product';
import useProductStore from '../../../../../stores/useProductsStore';
import useSelectItemStore from '../../../../../stores/useSelectItemStore';
import { useNavigate } from 'react-router-dom';

const SuccesProduct = () => {
  const { isSimilar, setIsState, handleClickAgain } = useImageSearchStore();
  const { products, setProducts } = useProductStore();
  const { selectProduct, setSelectProduct, setIsSelected, setSelectComplet } = useSelectItemStore();
  const navigate = useNavigate();

  const handleImageSearchPost = useMutation({
    mutationFn: (data: string) => ImageShoseSearchAPI(data),
    onSuccess: response => {
      console.log('키워드 전송 성공');

      console.log(response.data.products);
      const products: TProduct[] = response.data.products;
      setProducts(products);
      setSelectProduct(null);
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
    // selectProduct 는 API에서 가져온 데이터로 안에 이미지는 URL로 되어있음
    handleImageSearchPost.mutate(selectProduct!.image);
  };

  const handleNavigate = () => {
    setIsSelected(null);
    setSelectComplet(true);
    if (isSimilar && selectProduct) {
      navigate('/shoes-registry');
    } else if (!isSimilar) {
      setSelectProduct(selectProduct);
      console.log(selectProduct);
      navigate('/shoes-registry');
    }
  };

  return (
    <>
      {isSimilar ? (
        <>
          <div className={Product_SimilarProductContainer}>
            <div className={Product_ScrollableContent}>
              <div className={Product_ItemCardsContainer}>
                {products!.map((product, index) => (
                  <ItemCard key={index} index={index} data={product} />
                ))}
              </div>
            </div>
            <div className={Product_SimilarProductButton}>
              {selectProduct && <Button text="선택 완료" onClick={handleNavigate} />}
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
          <img className={Product_ProductImage} src={selectProduct!.image} alt="shoes_w159" />
          <div className={Product_ProductInfo}>
            <p className={Product_ProductBrand}>{selectProduct!.brand}</p>
            <p className={Product_ProductName}>{selectProduct!.modelName}</p>
          </div>
          <Button text="선택 완료" onClick={handleNavigate} />
        </div>
      )}
    </>
  );
};
export default SuccesProduct;
