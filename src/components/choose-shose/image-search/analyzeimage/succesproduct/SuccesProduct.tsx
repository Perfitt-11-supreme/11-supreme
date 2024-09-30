// css
import {
  Product_ProductBrand,
  Product_ProductImage,
  Product_ProductInfo,
  Product_ProductName,
  Product_Similar,
  Product_SimilarText,
  Product_SuccesContainer,
} from './succesproduct.css';
// Zustand
import useSelectItemStore from '../../../../../stores/useSelectItemStore';
// 커스텀 훅
import useImaeSearchPost from '../../hooks/useImaeSearchPost';

const SuccesProduct = () => {
  const { selectProduct } = useSelectItemStore();
  const handleImageSearchPost = useImaeSearchPost();

  return (
    <>
      <div className={Product_SuccesContainer}>
        <div
          className={Product_Similar}
          onClick={() => {
            // selectProduct 는 API에서 가져온 데이터로 안에 이미지는 URL로 되어있음
            handleImageSearchPost.mutate(selectProduct!.image);
          }}
        >
          <p className={Product_SimilarText}>비슷한 상품 더보기</p>
        </div>
        <img className={Product_ProductImage} src={selectProduct!.image} alt="shoes_w159" />
        <div className={Product_ProductInfo}>
          <p className={Product_ProductBrand}>{selectProduct!.brand}</p>
          <p className={Product_ProductName}>{selectProduct!.modelName}</p>
        </div>
      </div>
    </>
  );
};
export default SuccesProduct;
