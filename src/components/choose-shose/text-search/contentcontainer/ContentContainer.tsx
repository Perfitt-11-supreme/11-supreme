import {
  ContentContainer_Container,
  ContentContainer_RecentSearches,
  ContentContainer_Remove,
  ContentContainer_RecentRecord,
  ContentContainer_Line,
  ContentContainer_NoRecord,
  ContentContainer_Header,
} from './contentcontainer.css';
import TextItemCard from './itemcard/ItemCard';

const ContentContainer = ({
  record,
  focus,
  text,
  handleCLickRecentRecord,
  handleClickAllRemove,
}: {
  record: string[];
  focus: boolean;
  text: string;
  handleCLickRecentRecord: (str: string) => void;
  handleClickAllRemove: () => void;
}) => {
  return (
    <>
      {focus ? (
        <>
          <div className={ContentContainer_Container}>
            <div className={ContentContainer_Header}>
              <div className={ContentContainer_RecentSearches}>최근 검색어</div>
              <div className={ContentContainer_Remove} onClick={handleClickAllRemove}>
                전체삭제
              </div>
            </div>
            {record.length > 0 ? (
              record.map(text => (
                <div className={ContentContainer_RecentRecord} onClick={() => handleCLickRecentRecord(text)}>
                  {text}
                </div>
              ))
            ) : (
              <div className={ContentContainer_NoRecord}>최근 검색어가 없습니다.</div>
            )}
          </div>
          <div className={ContentContainer_Line} />
        </>
      ) : (
        <div>
          <TextItemCard />
          <TextItemCard />
          <TextItemCard />
          <TextItemCard />
          <TextItemCard />
          <TextItemCard />
          <TextItemCard />
          <TextItemCard />
          <TextItemCard />
          <TextItemCard />
        </div>
      )}
    </>
  );
};
export default ContentContainer;
