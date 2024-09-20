import {
  MainContainer_Container,
  MainContainer_RecentSearches,
  MainContainer_Remove,
  MainContainer_RecentRecord,
  MainContainer_Line,
  MainContainer_NoRecord,
  MainContainer_Header,
  MainContainter_Background,
} from './maincontainer.css';
import ItemCard from '../../itemcard/ItemCard';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import useProductsStore from '../../../../stores/useProductsStore';
import IsLoading from '../../isLoading/IsLoading';
import { useMutation } from '@tanstack/react-query';
import { textShoseSearchAPI } from '../../../../api/searchRequests';
import { TProduct } from '../../../../types/product';

const MainContainer = () => {
  const { text, postText, focus, record, isLoading, setState, handleCLickRecentRecord } = useTextSearchStore();
  const { products, setProducts } = useProductsStore();

  const handleTextSearchPost = useMutation({
    mutationFn: (data: string) => {
      setState({ isLoading: true, focus: false });
      return textShoseSearchAPI(data);
    },
    onSuccess: response => {
      console.log('키워드 전송 성공');

      const products: TProduct[] = response.data.products;
      setProducts(products);
      setState({ isLoading: false, postText: text, isSubmit: true });
    },
    onError: error => {
      console.error('이미지 서칭 실패:', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨');
    },
  });

  return (
    <>
      <div className={MainContainter_Background}>
        {focus ? (
          <>
            <div className={MainContainer_Container}>
              <div className={MainContainer_Header}>
                <div className={MainContainer_RecentSearches}>최근 검색어</div>
                <div
                  className={MainContainer_Remove}
                  onMouseDown={() => setState({ record: [], postText: '', remove: true })}
                >
                  전체삭제
                </div>
              </div>
              {record.length > 0 ? (
                record.map(text => (
                  <div
                    className={MainContainer_RecentRecord}
                    onClick={e => {
                      e.preventDefault();
                      handleCLickRecentRecord(text);
                      if (text !== postText) {
                        handleTextSearchPost.mutate(text);
                      }
                      setState({ focus: false });
                    }}
                  >
                    {text}
                  </div>
                ))
              ) : (
                <div className={MainContainer_NoRecord}>최근 검색어가 없습니다.</div>
              )}
              <div className={MainContainer_Line} />
            </div>
          </>
        ) : isLoading ? (
          <IsLoading text="검색중" isMargin={true} />
        ) : (
          <div>
            {products.map((data, index) => (
              <ItemCard key={index} index={index} data={data} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default MainContainer;
