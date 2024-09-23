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
import { useTextSearchHooks } from '../hooks/useTextSearchHooks';
import { useHandleTextSearchPost } from '../hooks/useHandleTextSearchPost';

const MainContainer = () => {
  const { postText, focus, textRecord, isLoading, setState, clearTextRecord } = useTextSearchStore();
  const { products } = useProductsStore();
  const { handleClickRecord } = useTextSearchHooks();
  const { handleTextSearchPost } = useHandleTextSearchPost();

  return (
    <>
      <div className={MainContainter_Background}>
        {focus ? (
          <>
            <div className={MainContainer_Container}>
              <div className={MainContainer_Header}>
                <div className={MainContainer_RecentSearches}>최근 검색어</div>
                <div className={MainContainer_Remove} onMouseDown={() => clearTextRecord()}>
                  전체삭제
                </div>
              </div>
              {textRecord.length > 0 ? (
                textRecord.map((text, index) => (
                  <p
                    key={index}
                    className={MainContainer_RecentRecord}
                    onClick={e => {
                      e.preventDefault();
                      setState({ text });

                      if (text !== postText) {
                        handleClickRecord(text);
                        handleTextSearchPost.mutate(text);
                      } else {
                        setState({ focus: false });
                      }
                    }}
                  >
                    {text}
                  </p>
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
