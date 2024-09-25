import { MainContainter_Background } from './maincontainer.css';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import TextRecordBox from './textrecordbox/TextRecordBox';
import ItemListBox from './itemlistbox/ItemListBox';
import { useEffect, useRef } from 'react';

const MainContainer = () => {
  const { focus, isScrolling, setIsScrolling } = useTextSearchStore();
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTop = useRef(0);

  const handleScroll = () => {
    if (mainContainerRef.current) {
      const { scrollTop } = mainContainerRef.current;
      if (scrollTop > lastScrollTop.current) {
        !isScrolling && setIsScrolling(true); // 스크롤 아래로
      } else if (scrollTop < lastScrollTop.current) {
        isScrolling && setIsScrolling(false); // 스크롤이 위로
      }

      lastScrollTop.current = scrollTop;
    }
  };

  useEffect(() => {
    const container = mainContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isScrolling]);

  return (
    <>
      <div className={MainContainter_Background} ref={mainContainerRef}>
        {focus ? <TextRecordBox /> : <ItemListBox />}
      </div>
    </>
  );
};
export default MainContainer;
