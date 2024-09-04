import { useState } from 'react';
import TextSearchBox from './search-box/SearchBox';
import TextHeader from './textheader/TextHeader';
import TextContentContainer from './contentcontainer/ContentContainer';

const TextSearch = () => {
  const [record, setRecord] = useState<string[]>([]);
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState('');

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length === 0) return;

    if (record.length >= 10) {
      record.pop();
    }

    if (record.includes(text)) {
      const filterRecord = record.filter(item => item !== text);
      filterRecord.unshift(text);

      setRecord(filterRecord);
    } else {
      setRecord(record => {
        return [text, ...record];
      });
    }
  };

  const handleCLickRecentRecord = (str: string) => {
    const filterRecord = record.filter(item => item !== str);
    filterRecord.unshift(str);

    setRecord(filterRecord);
    setText(str);
  };

  const handleClickAllRemove = () => {
    setRecord([]);
  };

  return (
    <>
      <div>
        <TextHeader />
        <TextSearchBox
          text={text}
          handleSubmitSearch={handleSubmitSearch}
          handleChangeText={handleChangeText}
          setFocus={setFocus}
        />
        <TextContentContainer
          record={record}
          focus={focus}
          text={text}
          handleCLickRecentRecord={handleCLickRecentRecord}
          handleClickAllRemove={handleClickAllRemove}
        />
      </div>
    </>
  );
};
export default TextSearch;
