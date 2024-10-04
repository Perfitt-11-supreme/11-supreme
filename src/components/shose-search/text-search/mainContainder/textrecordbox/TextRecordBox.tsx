// css
import {
  TextRecordBox_Container,
  TextRecordBox_Header,
  TextRecordBox_Line,
  TextRecordBox_NoRecord,
  TextRecordBox_RecentRecord,
  TextRecordBox_RecentSearches,
  TextRecordBox_Remove,
  TextRecordBox_TextList,
} from './textrecordbox.css';
// Zustand
import useTextSearchStore from '../../../../../stores/useTextSearchStore';
// 커스텀훅
import { useTextSearchHooks } from '../../../../../hooks/useTextSearchHooks';
import { useHandleTextSearchPost } from '../../../../../hooks/useHandleTextSearchPost';
// 컴포넌트
import IsLoading from '../../../isLoading/IsLoading';

const TextRecordBox = () => {
  const { postText, isLoading, textRecord, setText, setFocus, clearTextRecord } = useTextSearchStore();
  const { handleClickRecord } = useTextSearchHooks();
  const { handleTextSearchPost } = useHandleTextSearchPost();

  const renderTextRecords = () => {
    const render =
      textRecord.length > 0 ? (
        textRecord.map((text, index) => (
          <p
            key={index}
            className={TextRecordBox_RecentRecord}
            onClick={e => {
              e.preventDefault();
              setText(text);

              if (text !== postText) {
                handleClickRecord(text);
                handleTextSearchPost.mutate(text);
              } else {
                setFocus(false);
              }
            }}
          >
            {text}
          </p>
        ))
      ) : (
        <div className={TextRecordBox_NoRecord}>최근 검색어가 없습니다.</div>
      );

    return (
      <div className={TextRecordBox_TextList}>
        {render}
        <div className={TextRecordBox_Line} />
      </div>
    );
  };

  return (
    <>
      <div className={TextRecordBox_Container}>
        <div className={TextRecordBox_Header}>
          <div className={TextRecordBox_RecentSearches}>최근 검색어</div>
          <div
            className={TextRecordBox_Remove}
            onMouseDown={() => {
              clearTextRecord();
            }}
          >
            전체삭제
          </div>
        </div>
        {isLoading ? <IsLoading text="로딩중" /> : <>{renderTextRecords()}</>}
      </div>
    </>
  );
};

export default TextRecordBox;
