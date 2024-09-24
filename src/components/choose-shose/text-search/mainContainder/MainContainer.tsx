import { MainContainter_Background } from './maincontainer.css';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import TextRecordBox from './textrecordbox/TextRecordBox';
import ItemListBox from './itemlistbox/ItemListBox';

const MainContainer = () => {
  const { focus } = useTextSearchStore();

  return (
    <>
      <div className={MainContainter_Background}>{focus ? <TextRecordBox /> : <ItemListBox />}</div>
    </>
  );
};
export default MainContainer;
