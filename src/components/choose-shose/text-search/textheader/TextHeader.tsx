import { back_arrow } from '../../../../assets/assets.css';
import { TextHeader_Container, TextHeader_Frame, TextHeader_Title } from './textheader.css';

const TextHeader = () => {
  return (
    <>
      <header className={TextHeader_Container}>
        <div className={TextHeader_Frame}>
          <img src={back_arrow} alt="back_arrow" />
        </div>
        <div className={TextHeader_Title}>신발 검색</div>
        <div className={TextHeader_Frame}></div>
      </header>
    </>
  );
};
export default TextHeader;
