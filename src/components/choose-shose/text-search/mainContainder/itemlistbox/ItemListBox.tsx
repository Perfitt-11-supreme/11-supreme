import IsLoading from '../../../isLoading/IsLoading';
import ItemCard from '../../../itemcard/ItemCard';
// 상태 관리
import useTextSearchStore from '../../../../../stores/useTextSearchStore';
import useProductStore from '../../../../../stores/useProductsStore';

const ItemListBox = () => {
  const { isLoading } = useTextSearchStore();
  const { products } = useProductStore();

  return isLoading ? (
    <IsLoading text="검색중" />
  ) : (
    <div>
      {products.map((data, index) => (
        <ItemCard key={index} index={index} data={data} />
      ))}
      {products.map((data, index) => (
        <ItemCard key={index} index={index} data={data} />
      ))}
      {products.map((data, index) => (
        <ItemCard key={index} index={index} data={data} />
      ))}
      {products.map((data, index) => (
        <ItemCard key={index} index={index} data={data} />
      ))}
      {products.map((data, index) => (
        <ItemCard key={index} index={index} data={data} />
      ))}
    </div>
  );
};

export default ItemListBox;
