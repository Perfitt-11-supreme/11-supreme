import {
  individualitemContainer,
  itemIcon,
  textboxContainer,
  textboxRegular,
  textboxSemibold,
  itemContainerButton,
} from './itemBox.css';

interface ItemBoxProps {
  imageSrc: string;
  brand: string;
  itemName: string;
  price: string;
  onClick?: () => void;
}

const ItemBox: React.FC<ItemBoxProps> = ({ imageSrc, brand, itemName, price, onClick }) => {
  return (
    <button className={`${individualitemContainer} ${itemContainerButton}`} onClick={onClick}>
      <img src={imageSrc} alt={brand} className={itemIcon} />
      <div className={textboxContainer}>
        <div className={textboxRegular}>{brand}</div>
        <div className={textboxSemibold}>{itemName}</div>
        <div className={textboxSemibold}>{price}</div>
      </div>
    </button>
  );
};

export default ItemBox;
