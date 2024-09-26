import IsLoading from '../isLoading/IsLoading';
import useTextSearchStore from '../../../stores/useTextSearchStore';
import useProductStore from '../../../stores/useProductsStore';
import { ItemListBox_Container, ItemListBox_PaddingTop } from './itemlistbox.css';
import ItemCard from './itemcard/ItemCard';

const ItemListBox = ({ paddingTop = true }: { paddingTop?: boolean }) => {
  const { isLoading } = useTextSearchStore();
  const { products } = useProductStore();

  return (
    <div className={`${ItemListBox_Container} ${paddingTop && ItemListBox_PaddingTop}`}>
      {isLoading ? (
        <IsLoading text="검색중" />
      ) : (
        <>
          {products.map((data, index) => (
            <ItemCard key={index} index={index} data={data} />
          ))}
        </>
      )}
    </div>
  );
};

export default ItemListBox;
