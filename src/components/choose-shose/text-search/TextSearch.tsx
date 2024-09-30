// 아이콘 / 리액트
import { back_arrow } from '../../../assets/assets';
import { useEffect } from 'react';
// Zustand
import useProductStore from '../../../stores/useProductsStore';
import useTextSearchStore from '../../../stores/useTextSearchStore';
import useSelectItemStore from '../../../stores/useSelectItemStore';
// 커스텀훅
// 컴포넌트
import MainContainer from './mainContainder/MainContainer';
import TextFooter from './textfooter/TextFooter';
import SearchBox from './search-box/SearchBox';
import Header from '../../common/header/Header';
import { TextUpload } from '../firebase/textupload/TextUpload';

const TextSearch = () => {
  const { setProducts } = useProductStore();
  const { resetState } = useTextSearchStore();
  const { resetItem } = useSelectItemStore();
  const handleTextDownload = TextUpload();
  useEffect(() => {
    setProducts([]);
    resetState();
    resetItem();
    handleTextDownload();
  }, []);

  return (
    <>
      <Header imageSrc={back_arrow} alt="뒤로가기" title="신발검색" nav="/shoes-registry"></Header>
      <SearchBox />
      <MainContainer />
      <TextFooter />
    </>
  );
};
export default TextSearch;
