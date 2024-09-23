import { useEffect, useState } from 'react';
import { camera, search } from '../../../../assets/assets';
import {
  SearchBox_Background,
  SearchBox_Box,
  SearchBox_Container,
  SearchBox_Hide,
  SearchBox_cameraIcon,
  SearchBox_searchIcon,
} from './searchbox.css';
import { useNavigate } from 'react-router-dom';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import { useTextSearchHooks } from '../hooks/useTextSearchHooks';

const SearchBox = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const { text, setState } = useTextSearchStore();
  const { inputRef, handleSubmitForm } = useTextSearchHooks();
  const navigate = useNavigate();

  let lastScrollY = 0;
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsScrollingDown(true);
    } else {
      setIsScrollingDown(false);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    inputRef.current?.focus();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${SearchBox_Background} ${isScrollingDown ? SearchBox_Hide : ''}`}>
        <form onSubmit={handleSubmitForm} className={SearchBox_Container}>
          <img
            className={SearchBox_searchIcon}
            src={search}
            alt="search_icon"
            onClick={() => inputRef.current?.focus()}
          />
          <input
            className={SearchBox_Box}
            type="text"
            placeholder="신발이름, 모델명 검색"
            value={text}
            onChange={e => setState({ text: e.target.value })}
            onFocus={() => setState({ focus: true })}
            name="searchText"
            ref={inputRef}
            autoComplete="off"
          />
          <img
            className={SearchBox_cameraIcon}
            src={camera}
            alt="camera_icon"
            onClick={() => navigate('/image-search')}
          />
        </form>
      </div>
    </>
  );
};
export default SearchBox;
