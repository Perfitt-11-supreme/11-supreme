import { back_arrow } from '../../../../assets/assets';
import SearchBox from './search-box/SearchBox';
import { TextHeader_Container, TextHeader_Frame, TextHeader_Title, TextHeader_TouchBox } from './textheader.css';

const TextHeader = ({
  text,
  handleSubmitSearch,
  handleChangeText,
  handleFocusSearchBox,
}: {
  text: string;
  handleSubmitSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocusSearchBox: (bol: boolean) => void;
}) => {
  return (
    <>
      <header className={TextHeader_Container}>
        <div className={TextHeader_Frame}>
          <div className={TextHeader_TouchBox}>
            <img src={back_arrow} alt="back_arrow" />
          </div>
          <div className={TextHeader_TouchBox}></div>
        </div>
        <div className={TextHeader_Title}>신발 검색</div>
        <div className={TextHeader_Frame}>
          <div></div>
          <div></div>
        </div>
      </header>
      <SearchBox
        text={text}
        handleSubmitSearch={handleSubmitSearch}
        handleChangeText={handleChangeText}
        handleFocusSearchBox={handleFocusSearchBox}
      />
    </>
  );
};
export default TextHeader;
