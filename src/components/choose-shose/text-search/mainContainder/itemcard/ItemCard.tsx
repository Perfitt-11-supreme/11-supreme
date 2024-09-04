import { shoes_w159 } from '../../../../../assets/assets';
import {
  ItemCard_Container,
  ItemCard_Frame,
  ItemCard_Rectangle,
  ItemCard_ShoseBrand,
  ItemCard_ShoseName,
  ItemCard_ShosePrice,
} from './itemcard.css';

const TextItemCard = () => {
  return (
    <>
      <div className={ItemCard_Container}>
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
export default TextItemCard;
