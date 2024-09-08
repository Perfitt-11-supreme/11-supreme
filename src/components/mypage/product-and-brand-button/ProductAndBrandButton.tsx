import { TButton } from '../../../types/button';
import {
  filterProductAndBrand,
  filterProductAndBrandButtonBox,
  filterProductAndBrandChecked,
} from './productAndBrandButton.css';

type ProductAndBrandButtonProps = {
  handleClick: (buttonType: string) => void;
  activeTab: string;
};

const ProductAndBrandButton = ({ handleClick, activeTab }: ProductAndBrandButtonProps) => {
  const buttons: TButton[] = [{ text: '상품' }, { text: '브랜드' }];
  return (
    <>
      <article className={filterProductAndBrandButtonBox}>
        {buttons.map(({ text }) => (
          <button
            key={text}
            type="button"
            className={activeTab === text ? filterProductAndBrandChecked : filterProductAndBrand}
            onClick={() => handleClick(text)}
          >
            {text}
          </button>
        ))}
      </article>
    </>
  );
};

export default ProductAndBrandButton;
