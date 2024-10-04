// Zustand
import useProductStore from '../stores/useProductsStore';
import useTextSearchStore from '../stores/useTextSearchStore';
// 커스텀훅
import { useHandleTextSearchPost } from './useHandleTextSearchPostHook';

export const useTextSearch = () => {
  const { text, postText, textRecord, setTextRecord } = useTextSearchStore();
  const { handleTextSearchPost } = useHandleTextSearchPost();
  const { products } = useProductStore();

  const handleClickRecord = (text: string) => {
    if (text !== null) {
      const filterRecord = textRecord.filter(item => item !== text);

      setTextRecord(text, filterRecord);
    }
  };

  const handleSubmitForm = (data: string) => {
    if (data !== postText) {
      if (data.length !== 0) {
        if (textRecord.includes(data)) {
          handleClickRecord(data);
        } else {
          if (textRecord.length >= 10) {
            textRecord.pop();
          }
          setTextRecord(data);
        }
      }

      handleTextSearchPost.mutate(text);
    } else if (text === '' && products.length === 0) {
      handleTextSearchPost.mutate(text);
    }
  };

  return { handleClickRecord, handleSubmitForm };
};
