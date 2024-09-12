import { useState } from 'react';
import MainContainer from './mainContainder/MainContainer';
import TextFooter from './textfooter/TextFooter';
import SearchBox from './search-box/SearchBox';
import { back_arrow } from '../../../assets/assets';
import Header from '../../common/header/Header';

const TextSearch = () => {
  const [record, setRecord] = useState<string[]>([]);
  const [focus, setFocus] = useState(true);
  const [text, setText] = useState('');
  const [remove, setRemove] = useState(false);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.length === 0) return;

    if (record.length >= 10) {
      record.pop();
    }

    console.log();

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

  const handleFocusSearchBox = (bol: boolean) => {
    if (remove) {
      setRemove(false);
      return;
    }
    setFocus(bol);
  };

  const handleCLickRecentRecord = (str: string) => {
    const filterRecord = record.filter(item => item !== str);
    filterRecord.unshift(str);

    setRecord(filterRecord);
    setText(str);
  };

  const handleClickAllRemove = () => {
    setRecord([]);
    setRemove(true);
  };

  return (
    <>
      <div>
        <Header imageSrc={back_arrow} alt="뒤로가기" title="신발검색" nav="/shoes-registry"></Header>
        <SearchBox
          text={text}
          handleSubmitSearch={handleSubmitSearch}
          handleChangeText={handleChangeText}
          handleFocusSearchBox={handleFocusSearchBox}
        />
        <MainContainer
          record={record}
          focus={focus}
          handleCLickRecentRecord={handleCLickRecentRecord}
          handleClickAllRemove={handleClickAllRemove}
        />
        <TextFooter />
      </div>
    </>
  );
};
export default TextSearch;
