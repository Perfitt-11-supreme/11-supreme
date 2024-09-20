// import { useShoesRegistryStore } from '../../../stores/useRegistryStore';
import useSelectItemStore from '../../../stores/useSelectItemStore';
import { TProduct } from '../../../types/product';
import {
  ItemCard_Container,
  ItemCard_Frame,
  ItemCard_Image,
  ItemCard_Rectangle,
  ItemCard_Select,
  ItemCard_ShoseBrand,
  ItemCard_ShoseName,
} from './itemcard.css';

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
          <p className={ItemCard_ShoseBrand}>{data!.brand}</p>
          <p className={ItemCard_ShoseName}>{data!.modelName}</p>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
