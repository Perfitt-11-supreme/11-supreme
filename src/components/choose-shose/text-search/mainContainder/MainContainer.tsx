import { MainContainter_Background } from './maincontainer.css';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import TextRecordBox from './textrecordbox/TextRecordBox';
import ItemListBox from './itemlistbox/ItemListBox';
import { useEffect } from 'react';

const MainContainer = () => {
  const { focus, setIsScrolling } = useTextSearchStore();

  let lastScrollY = 0;
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={MainContainter_Background}>
        {focus ? (
          <TextRecordBox />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ItemListBox />
          </div>
        )}
      </div>
    </>
  );
};
export default MainContainer;
