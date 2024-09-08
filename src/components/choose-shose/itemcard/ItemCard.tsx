import { shoes_w159 } from '../../../assets/assets';
import { useShoesRegistryStore } from '../../../stores/useRegistryStore';
import {
  ItemCard_Container,
  ItemCard_Frame,
  ItemCard_Rectangle,
  ItemCard_Select,
  ItemCard_ShoseBrand,
  ItemCard_ShoseName,
  ItemCard_ShosePrice,
} from './itemcard.css';

const ItemCard = ({
  index,
  isSelected,
  handleClickItemCard,
}: {
  index: number;
  isSelected?: number | null;
  handleClickItemCard: (index: number) => void;
}) => {
  const setSelectedItem = useShoesRegistryStore(state => state.setSelectedItem);

  const handleClick = () => {
    handleClickItemCard(index);
    setSelectedItem({
      image: shoes_w159,
      brand: 'Hoka',
      shoesName: '호카 카하 2 고어텍스 블랙',
    });
  };
  return (
    <>
      <div className={`${ItemCard_Container} ${index === isSelected ? ItemCard_Select : ''}`} onClick={handleClick}>
        <div className={ItemCard_Rectangle}>
          <img src={shoes_w159} alt="" />
        </div>
        <div className={ItemCard_Frame}>
          <p className={ItemCard_ShoseBrand}>Hoka</p>
          <p className={ItemCard_ShoseName}>호카 카하 2 고어텍스 블랙</p>
          <p className={ItemCard_ShosePrice}>179,000원</p>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
