import { asics, hoka, more_arrow, salomon } from '../../../../assets/assets';
import ItemBox from './itembox/ItemBox';
import { fullContainer, textTop } from './itembox/itemBox.css';
import RecommendBottom from './RecommendBottom';

const items = [
  { imageSrc: asics, brand: 'Asics', itemName: '아식스 조그 100 S 화이트', price: '96,000원' },
  { imageSrc: hoka, brand: 'Hoka', itemName: '호카 카하 2 로우 고어텍스 블랙', price: '100,000원' },
  { imageSrc: salomon, brand: 'Salomon', itemName: '살로몬 XT-6 익스팬스 바닐라 아이스 화이트', price: '169,000원' },
];

const RecommendBox = () => {
  return (
    <div className={fullContainer}>
      <div className={textTop}>맞춤 상품 추천</div>
      {items.map((item, index) => (
        <ItemBox key={index} imageSrc={item.imageSrc} brand={item.brand} itemName={item.itemName} price={item.price} />
      ))}
      <RecommendBottom text="더보기" imageSrc={more_arrow} />
    </div>
  );
};

export default RecommendBox;
