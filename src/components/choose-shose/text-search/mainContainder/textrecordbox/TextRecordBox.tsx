import {
  TextRecordBox_Container,
  TextRecordBox_Header,
  TextRecordBox_Line,
  TextRecordBox_NoRecord,
  TextRecordBox_RecentRecord,
  TextRecordBox_RecentSearches,
  TextRecordBox_Remove,
} from './textrecordbox.css';
import useTextSearchStore from '../../../../../stores/useTextSearchStore';
import { useTextSearchHooks } from '../../hooks/useTextSearchHooks';
import { useHandleTextSearchPost } from '../../hooks/useHandleTextSearchPost';
import IsLoading from '../../../isLoading/IsLoading';

const TextRecordBox = () => {
  const { postText, isLoading, textRecord, setState, clearTextRecord } = useTextSearchStore();
  const { handleClickRecord } = useTextSearchHooks();
  const { handleTextSearchPost } = useHandleTextSearchPost();

  return (
    <>
      <div className={TextRecordBox_Container}>
        <div className={TextRecordBox_Header}>
          <div className={TextRecordBox_RecentSearches}>최근 검색어</div>
          <div className={TextRecordBox_Remove} onMouseDown={() => clearTextRecord()}>
            전체삭제
          </div>
        </div>
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto' }}>
            <IsLoading text="로딩중" isMargin={true} />
          </div>
        ) : (
          <>
            {textRecord.length > 0 ? (
              textRecord.map((text, index) => (
                <p
                  key={index}
                  className={TextRecordBox_RecentRecord}
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
              <div className={TextRecordBox_NoRecord}>최근 검색어가 없습니다.</div>
            )}
            <div className={TextRecordBox_Line} />
          </>
        )}
      </div>
    </>
  );
};

export default TextRecordBox;
