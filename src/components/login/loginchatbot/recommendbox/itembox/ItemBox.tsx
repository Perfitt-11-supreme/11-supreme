import {
  individualitemContainer,
  itemContainerButton,
  itemIcon,
  textboxContainer,
  textboxRegular,
  textboxSemibold,
} from './itemBox.css';

type ItemBoxProps = {
  image: string;
  brand: string;
  modelName: string;
  onClick?: () => void;
};

const ItemBox = ({ image, brand, modelName, onClick }: ItemBoxProps) => {
  return (
    <button className={`${individualitemContainer} ${itemContainerButton}`} onClick={onClick}>
      <img src={image} alt={brand} className={itemIcon} />
      <div className={textboxContainer}>
        <div className={textboxRegular}>{brand}</div>
        <div className={textboxSemibold}>{modelName}</div>
        {/* <div className={textboxSemibold}>{price}</div> */}
      </div>
    </button>
  );
};

export default ItemBox;
