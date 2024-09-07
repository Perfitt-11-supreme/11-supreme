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
import { useState } from 'react';
import { useShoesStore } from '../../../../stores/useShoesStore';

const MainContainer = ({
  record,
  focus,
  handleCLickRecentRecord,
  handleClickAllRemove,
}: {
  record: string[];
  focus: boolean;
  handleCLickRecentRecord: (str: string) => void;
  handleClickAllRemove: () => void;
}) => {
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const cards = Array(10).fill(null);

  const handleClickItemCard = (index: number) => {
    setIsSelected(index);
    setSelectedItem(index);
  };

  const setSelectedItem = useShoesStore(state => state.setSelectedItem);

  return (
    <>
      <div className={MainContainter_Background}>
        {focus ? (
          <>
            <div className={MainContainer_Container}>
              <div className={MainContainer_Header}>
                <div className={MainContainer_RecentSearches}>최근 검색어</div>
                <div className={MainContainer_Remove} onMouseDown={handleClickAllRemove}>
                  전체삭제
                </div>
              </div>
              {record.length > 0 ? (
                record.map(text => (
                  <div className={MainContainer_RecentRecord} onMouseDown={() => handleCLickRecentRecord(text)}>
                    {text}
                  </div>
                ))
              ) : (
                <div className={MainContainer_NoRecord}>최근 검색어가 없습니다.</div>
              )}
            </div>
            <div className={MainContainer_Line} />
          </>
        ) : (
          <div>
            {cards.map((_, index) => (
              <ItemCard key={index} index={index} isSelected={isSelected} handleClickItemCard={handleClickItemCard} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default MainContainer;
