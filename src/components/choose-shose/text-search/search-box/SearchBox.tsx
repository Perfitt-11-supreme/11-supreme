import React, { useRef } from 'react';
import { camera, search } from '../../../../assets/assets.css';
import { SearchBox_Container, SearchBox_searchIcon, SearchBox_Box, SearchBox_cameraIcon } from './searchbox.css';

const TextSearchBox = ({
  text,
  handleSubmitSearch,
  handleChangeText,
  setFocus,
}: {
  text: string;
  handleSubmitSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickImage = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <form onSubmit={handleSubmitSearch} className={SearchBox_Container}>
        <img className={SearchBox_searchIcon} src={search} alt="search_icon" onClick={handleClickImage} />
        <input
          className={SearchBox_Box}
          type="text"
          placeholder="신발이름, 모델명 검색"
          value={text}
          onChange={handleChangeText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          name="searchText"
          ref={inputRef}
        />
        <img className={SearchBox_cameraIcon} src={camera} alt="camera_icon" />
      </form>
    </>
  );
};
export default TextSearchBox;
