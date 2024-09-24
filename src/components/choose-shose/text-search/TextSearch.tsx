import { back_arrow } from '../../../assets/assets';
import { useEffect } from 'react';
import { responsiveBox } from '../../../styles/responsive.css';
import MainContainer from './mainContainder/MainContainer';
import TextFooter from './textfooter/TextFooter';
import SearchBox from './search-box/SearchBox';
import Header from '../../common/header/Header';
// 전역상태관리
import useProductStore from '../../../stores/useProductsStore';
import useTextSearchStore from '../../../stores/useTextSearchStore';
import useSelectItemStore from '../../../stores/useSelectItemStore';
import { FetchTextRecord } from '../firebase/textupload/FetchTextRecord';
// 커스텀훅

const TextSearch = () => {
  const { setProducts } = useProductStore();
  const { resetState } = useTextSearchStore();
  const { resetItem } = useSelectItemStore();
  const { handleTextDownload } = FetchTextRecord();
  useEffect(() => {
    setProducts([]);
    resetState();
    resetItem();
    handleTextDownload();
  }, []);

  console.log('랜더링됨');

  return (
    <>
      <div className={responsiveBox}>
        <Header imageSrc={back_arrow} alt="뒤로가기" title="신발검색" nav="/shoes-registry"></Header>
        <SearchBox />
        <MainContainer />
        <TextFooter />
      </div>
    </>
  );
};
export default TextSearch;
