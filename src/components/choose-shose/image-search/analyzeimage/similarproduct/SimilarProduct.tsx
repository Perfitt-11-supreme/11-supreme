import useImageSearchStore from '../../../../../stores/useImageSearchStore';
import useProductStore from '../../../../../stores/useProductsStore';
import useSelectItemStore from '../../../../../stores/useSelectItemStore';
import Button from '../../../../common/button/Button';
import ItemCard from '../../../itemcard/ItemCard';
import useHandleImageSearchNavigate from '../../hooks/useHandleImageSearchNavigate';
import {
  SimilarProduct_Button,
  SimilarProduct_Container,
  SimilarProduct_ItemCardsContainer,
  SimilarProduct_ScrollableContent,
} from './similarproduct.css';

const SimilarProduct = () => {
  const { products } = useProductStore();
  const { selectProduct } = useSelectItemStore();
  const { isSimilar } = useImageSearchStore();
  const handleImageSearchNavigate = useHandleImageSearchNavigate(isSimilar);

  return (
    <div className={SimilarProduct_Container}>
      <div className={SimilarProduct_ScrollableContent}>
        <div className={SimilarProduct_ItemCardsContainer}>
          {products!.map((product, index) => (
            <ItemCard key={index} index={index} data={product} />
          ))}
        </div>
      </div>
      <div className={SimilarProduct_Button}>
        {selectProduct && <Button text="선택 완료" onClick={handleImageSearchNavigate} type="button" />}
      </div>
    </div>
  );
};
export default SimilarProduct;
