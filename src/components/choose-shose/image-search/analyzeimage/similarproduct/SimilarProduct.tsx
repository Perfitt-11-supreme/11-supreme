import { SimilarProduct_Container } from './similarproduct.css';
import ItemListBox from '../../../itemlistbox/ItemListBox';

const SimilarProduct = () => {
  return (
    <div className={SimilarProduct_Container}>
      <ItemListBox paddingTop={false} />
    </div>
  );
};
export default SimilarProduct;
