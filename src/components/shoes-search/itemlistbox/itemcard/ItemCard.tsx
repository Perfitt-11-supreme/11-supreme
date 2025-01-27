// css
import {
  ItemCard_Container,
  ItemCard_Frame,
  ItemCard_Image,
  ItemCard_Rectangle,
  ItemCard_Select,
  ItemCard_ShoesBrand,
  ItemCard_ShoesName,
} from './itemcard.css';
// Zustand
import useSelectItemStore from '../../../../stores/useSelectItemStore';
// 타입
import { TProduct } from '../../../../types/product';

const ItemCard = ({ index, data }: { index: number; data: TProduct }) => {
  const { isSelected, setIsSelected, setSelectProduct } = useSelectItemStore();

  const handleClick = () => {
    setIsSelected(index);
    setSelectProduct(data);
  };
  return (
    <>
      <div className={`${ItemCard_Container} ${index === isSelected ? ItemCard_Select : ''}`} onClick={handleClick}>
        <div className={ItemCard_Rectangle}>
          <img className={ItemCard_Image} src={data!.image} alt="" />
        </div>
        <div className={ItemCard_Frame}>
          <p className={ItemCard_ShoesBrand}>{data!.brand}</p>
          <p className={ItemCard_ShoesName}>{data!.modelName}</p>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
