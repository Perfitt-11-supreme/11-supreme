import { asics, hoka, more_arrow, salomon } from '../../assets/assets.css';
import ItemBox from '../itembox/ItemBox';
import { fullContainer, textTop } from '../itembox/itemBox.css';
import RecommendBottom from './RecommendBottom';

const RecommendBox: React.FC = () => {
  return (
    <div className={fullContainer}>
      <div className={textTop}>맞춤 상품 추천</div>
      <ItemBox imageSrc={asics} brand="Asics" itemName="아식스 조그 100 S 화이트" price="96,000원" />
      <ItemBox imageSrc={hoka} brand="Hoka" itemName="호카 카하 2 로우 고어텍스 블랙" price="100,000원" />
      <ItemBox
        imageSrc={salomon}
        brand="Salomon"
        itemName="살로몬 XT-6 익스팬스 바닐라 아이스 화이트"
        price="169,000원"
      />
      <RecommendBottom text="더보기" imageSrc={more_arrow} />
    </div>
  );
};

export default RecommendBox;
