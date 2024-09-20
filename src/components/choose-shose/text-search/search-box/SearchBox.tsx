import React, { useEffect, useRef, useState } from 'react';
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
import { useMutation } from '@tanstack/react-query';
import { textShoseSearchAPI } from '../../../../api/searchRequests';
import { TProduct } from '../../../../types/product';
import useProductStore from '../../../../stores/useProductsStore';

const SearchBox = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const { text, postText, setState, handleSubmitSearch, handleFocusSearchBox } = useTextSearchStore();
  const { products, setProducts } = useProductStore();

  const navigate = useNavigate();

  const handleTextSearchPost = useMutation({
    mutationFn: (data: string) => {
      setState({ isLoading: true, isSubmit: true });
      return textShoseSearchAPI(data);
    },
    onSuccess: response => {
      console.log('키워드 전송 성공');

      const products: TProduct[] = response.data.products;
      setProducts(products);
      setState({ isLoading: false, postText: text });
    },
    onError: error => {
      console.error('이미지 서칭 실패:', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨');
    },
  });

  const handleNavigation = () => {
    navigate('/image-search');
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text !== postText) {
      handleTextSearchPost.mutate(text);
      handleSubmitSearch();
    } else if (text === '' && products.length === 0) {
      handleTextSearchPost.mutate(text);
    }
    setState({ focus: false });
    inputRef.current?.blur();
  };

  const handleClickSearchIcon = () => {
    inputRef.current?.focus();
  };

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
          <img className={SearchBox_searchIcon} src={search} alt="search_icon" onClick={handleClickSearchIcon} />
          <input
            className={SearchBox_Box}
            type="text"
            placeholder="신발이름, 모델명 검색"
            value={text}
            onChange={e => setState({ text: e.target.value })}
            onFocus={() => handleFocusSearchBox(true)}
            name="searchText"
            ref={inputRef}
            autoComplete="off"
          />
          <img className={SearchBox_cameraIcon} src={camera} alt="camera_icon" onClick={handleNavigation} />
        </form>
      </div>
    </>
  );
};
export default SearchBox;
