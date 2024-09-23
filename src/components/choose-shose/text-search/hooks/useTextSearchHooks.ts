import { useRef } from 'react';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import useProductStore from '../../../../stores/useProductsStore';
import { useHandleTextSearchPost } from './useHandleTextSearchPost';

export const useTextSearchHooks = () => {
  const { text, postText, textRecord, setState, setTextRecord } = useTextSearchStore();
  const { handleTextSearchPost } = useHandleTextSearchPost();
  const { products } = useProductStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickRecord = (text: string) => {
    if (text !== null) {
      const filterRecord = textRecord.filter(item => item !== text);

      setTextRecord(text, filterRecord);
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text !== postText) {
      if (text.length !== 0) {
        if (textRecord.includes(text)) {
          handleClickRecord(text);
        } else {
          if (textRecord.length >= 10) {
            textRecord.pop();
          }
          setTextRecord(text);
        }
      }

      handleTextSearchPost.mutate(text);
    } else if (text === '' && products.length === 0) {
      handleTextSearchPost.mutate(text);
    }
    setState({ focus: false });
    inputRef.current?.blur();
  };

  return { inputRef, handleClickRecord, handleSubmitForm };
};
