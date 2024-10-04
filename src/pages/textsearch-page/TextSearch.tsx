// 아이콘 / 리액트
import { useEffect } from 'react';
import { back_arrow } from '../../assets/assets';
// Zustand
import useProductStore from '../../stores/useProductsStore';
import useSelectItemStore from '../../stores/useSelectItemStore';
import useTextSearchStore from '../../stores/useTextSearchStore';
// 커스텀훅
import { TextUpload } from '../../firebase/TextUpload';
// 컴포넌트
import Header from '../../components/common/header/Header';
import MainContainer from '../../components/shoes-search/text-search/mainContainder/MainContainer';
import SearchBox from '../../components/shoes-search/text-search/search-box/SearchBox';
import TextFooter from '../../components/shoes-search/text-search/textfooter/TextFooter';

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
