import { useShoesRegistryStore } from '../../../stores/useRegistryStore';
import useSelectItemStore from '../../../stores/useSelectItemStore';
import { TProduct } from '../../../types/product';
import {
  ItemCard_Container,
  ItemCard_Frame,
  ItemCard_Rectangle,
  ItemCard_Select,
  ItemCard_ShoseBrand,
  ItemCard_ShoseName,
} from './itemcard.css';

const ItemCard = ({
  index,
  isSelected,
  handleClickItemCard,
  data,
}: {
  index: number;
  isSelected?: number | null;
  handleClickItemCard: (index: number) => void;
  data: TProduct;
}) => {
  const setSelectedItem = useShoesRegistryStore(state => state.setSelectedItem);
  const { setSelectProduct } = useSelectItemStore();

  const handleClick = () => {
    handleClickItemCard(index);
    setSelectedItem({
      image: data.image,
      brand: data.brand,
      shoesName: data.modelName,
    });
    console.log(data.image);
    console.log(data.brand);
    console.log(data.modelName);
    setSelectProduct(data);
  };
  return (
    <>
      <div className={`${ItemCard_Container} ${index === isSelected ? ItemCard_Select : ''}`} onClick={handleClick}>
        <div className={ItemCard_Rectangle}>
          <img src={data.image} alt="" />
        </div>
        <div className={ItemCard_Frame}>
          <p className={ItemCard_ShoseBrand}>{data.brand}</p>
          <p className={ItemCard_ShoseName}>{data.modelName}</p>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
