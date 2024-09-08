import { useState } from 'react';
import { again, shoes_w159 } from '../../../../../../assets/assets';
import Button from '../../../../../common/button/Button';
import {
  Product_AgainBox,
  Product_AgainIcon,
  Product_AgainText,
  Product_ProductBrand,
  Product_ProductImage,
  Product_ProductInfo,
  Product_ProductName,
  Product_ProductPrice,
  Product_ScrollableContent,
  Product_Similar,
  Product_SimilarProductButton,
  Product_SimilarProductContainer,
  Product_SimilarText,
  Product_SuccesContainer,
} from './succesproduct.css';
import ItemCard from '../../../../itemcard/ItemCard';

const SuccesProduct = ({
  handleClickAgain,
  isSimilar,
  setIsSimilar,
  capturedImage,
}: {
  handleClickAgain: (bol: boolean) => void;
  isSimilar: boolean;
  setIsSimilar: React.Dispatch<React.SetStateAction<boolean>>;
  capturedImage: string | null;
}) => {
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const cards = Array(10).fill(null);

  const handleClickItemCard = (index: number) => {
    setIsSelected(index);
  };

  return (
    <>
      {isSimilar ? (
        <>
          <div className={Product_SimilarProductContainer}>
            <div className={Product_ScrollableContent}>
              {cards.map((_, index) => (
                <ItemCard key={index} index={index} isSelected={isSelected} handleClickItemCard={handleClickItemCard} />
              ))}
            </div>
            <div className={Product_SimilarProductButton}>
              <Button text="선택 완료"></Button>
            </div>
          </div>
        </>
      ) : (
        <div className={Product_SuccesContainer}>
          <div className={Product_AgainBox} onClick={() => handleClickAgain(false)}>
            <img className={Product_AgainIcon} src={again} alt="again" />
            <p className={Product_AgainText}>다시하기</p>
          </div>
          <div className={Product_Similar} onClick={() => setIsSimilar(true)}>
            <p className={Product_SimilarText}>비슷한 상품 더보기</p>
          </div>
          <img className={Product_ProductImage} src={capturedImage!} alt="shoes_w159" />
          <div className={Product_ProductInfo}>
            <p className={Product_ProductBrand}>Hoka</p>
            <p className={Product_ProductName}>호카 카하 2 로우 고어텍스 옥스 포드 탄</p>
            <p className={Product_ProductPrice}>209,000원</p>
          </div>
          <Button text="선택 완료"></Button>
        </div>
      )}
    </>
  );
};
export default SuccesProduct;
