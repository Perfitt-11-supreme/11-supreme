// 리액트 / 아이콘 / css
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { camera, search } from '../../../../assets/assets';
import {
  SearchBox_Background,
  SearchBox_Box,
  SearchBox_Container,
  SearchBox_Hide,
  SearchBox_cameraIcon,
  SearchBox_searchIcon,
} from './searchbox.css';
// Zustand
import useTextSearchStore from '../../../../stores/useTextSearchStore';
// 커스텀 훅
import { useTextSearchHooks } from '../hooks/useTextSearchHooks';

const SearchBox = () => {
  const { text, postText, isScrolling, setText, setFocus } = useTextSearchStore();
  const { handleSubmitForm, handleClickRecord } = useTextSearchHooks();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus: setFormFocus,
    setValue,
  } = useForm({
    defaultValues: {
      searchText: '',
    },
  });

  const onSubmit = (data: { searchText: string }) => {
    // 입력된 값이 전에 검색한 값이라면
    if (text === data.searchText) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
        setFocus(false);
        // 값을 입력후 전체삭제를 눌렀다면 검색 기록에 값만 추가
        if (text !== postText) {
          handleClickRecord(text);
        }
      }
    }
    // 입력값이 있을때
    else if (data.searchText) {
      setText(data.searchText);
    }
    // 아무것도 입력하지 않았다면
    else {
      setText('');
    }
  };

  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    if (pageLoad) {
      handleSubmitForm(text);
      // 어디서든 검색 기록 클릭시 input태그 안에 값 text로 바꾸기
      setValue('searchText', text);
      // 현재 포커스 되있는 요소 블러처리
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
        setFocus(false);
      }
    } else {
      setPageLoad(true);
      setFormFocus('searchText');
    }
  }, [text]);

  const handleFocusInput = useCallback(() => {
    setFocus(true);
  }, []);

  const handleClickSearchIcon = useCallback(() => {
    setFormFocus('searchText');
  }, []);

  const handleClickCameraIcon = useCallback(() => {
    navigate('/image-search');
  }, []);

  return (
    <>
      <div className={`${SearchBox_Background} ${isScrolling ? SearchBox_Hide : ''}`}>
        <form onSubmit={handleSubmit(onSubmit)} className={SearchBox_Container}>
          <img className={SearchBox_searchIcon} src={search} alt="search_icon" onClick={handleClickSearchIcon} />
          <input
            {...register('searchText')}
            className={SearchBox_Box}
            type="text"
            placeholder="신발이름, 모델명 검색"
            onFocus={handleFocusInput}
            autoComplete="off"
          />
          <img className={SearchBox_cameraIcon} src={camera} alt="camera_icon" onClick={handleClickCameraIcon} />
        </form>
      </div>
    </>
  );
};

export default SearchBox;
