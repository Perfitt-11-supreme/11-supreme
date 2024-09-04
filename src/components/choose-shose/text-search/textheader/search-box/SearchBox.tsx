import React, { useEffect, useRef, useState } from 'react';
import { camera, search } from '../../../../../assets/assets.css';
import {
  SearchBox_Container,
  SearchBox_searchIcon,
  SearchBox_Box,
  SearchBox_cameraIcon,
  SearchBox_Background,
  SearchBox_Hide,
} from './searchbox.css';

const SearchBox = ({
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  let lastScrollY = 0;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsScrollingDown(true);
    } else {
      setIsScrollingDown(false);
    }
    lastScrollY = window.scrollY;
  };

  const handleClickImage = () => {
    inputRef.current?.focus();
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmitSearch(e);
    inputRef.current?.blur();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${SearchBox_Background} ${isScrollingDown ? SearchBox_Hide : ''}`}>
        <form onSubmit={handleSubmitForm} className={SearchBox_Container}>
          <img className={SearchBox_searchIcon} src={search} alt="search_icon" onClick={handleClickImage} />
          <input
            className={SearchBox_Box}
            type="text"
            placeholder="신발이름, 모델명 검색"
            value={text}
            onChange={handleChangeText}
            onFocus={() => handleFocusSearchBox(true)}
            onBlur={() => handleFocusSearchBox(false)}
            name="searchText"
            ref={inputRef}
          />
          <img className={SearchBox_cameraIcon} src={camera} alt="camera_icon" />
        </form>
      </div>
    </>
  );
};
export default SearchBox;
