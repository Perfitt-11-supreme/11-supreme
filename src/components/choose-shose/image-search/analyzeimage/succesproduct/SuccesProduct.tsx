import { again } from '../../../../../assets/assets';
import Button from '../../../../common/button/Button';
import {
  Product_AgainBox,
  Product_AgainContainder,
  Product_AgainIcon,
  Product_AgainText,
  Product_ProductBrand,
  Product_ProductImage,
  Product_ProductInfo,
  Product_ProductName,
  Product_Similar,
  Product_SimilarText,
  Product_SuccesContainer,
} from './succesproduct.css';
import useImageSearchStore from '../../../../../stores/useImageSearchStore';
import useSelectItemStore from '../../../../../stores/useSelectItemStore';
import useHandleImageSearchPost from '../../hooks/useHandleImaeSearchPost';
import useHandleImageSearchNavigate from '../../hooks/useHandleImageSearchNavigate';

const SuccesProduct = () => {
  const { isSimilar, isSuccess, setIsState } = useImageSearchStore();
  const { selectProduct } = useSelectItemStore();
  const handleImageSearchPost = useHandleImageSearchPost(isSuccess);
  const handleImageSearchNavigate = useHandleImageSearchNavigate(isSimilar);

  const handleClickSimilar = () => {
    // selectProduct 는 API에서 가져온 데이터로 안에 이미지는 URL로 되어있음
    handleImageSearchPost.mutate(selectProduct!.image);
  };

  return (
    <>
      <div className={Product_SuccesContainer}>
        <div className={Product_AgainContainder}>
          <div className={Product_AgainBox} onClick={() => setIsState({ isAnalyze: false, isSuccess: false })}>
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
        <Button text="선택 완료" onClick={handleImageSearchNavigate} />
      </div>
    </>
  );
};
export default SuccesProduct;