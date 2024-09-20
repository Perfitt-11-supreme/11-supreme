import MainContainer from './mainContainder/MainContainer';
import TextFooter from './textfooter/TextFooter';
import SearchBox from './search-box/SearchBox';
import { back_arrow } from '../../../assets/assets';
import Header from '../../common/header/Header';
import { useEffect } from 'react';
import useProductStore from '../../../stores/useProductsStore';
import useTextSearchStore from '../../../stores/useTextSearchStore';
import { responsiveBox } from '../../../styles/responsive.css';
import useSelectItemStore from '../../../stores/useSelectItemStore';

const TextSearch = () => {
  const { setProducts } = useProductStore();
  const { setState } = useTextSearchStore();
  const { setIsSelected, setSelectProduct, setSelectComplet } = useSelectItemStore();
  useEffect(() => {
    setProducts([]);
    setState({ focus: true, text: '', postText: '', remove: false, isLoading: true, isSubmit: false });
    setIsSelected(null);
    setSelectProduct(null);
    setSelectComplet(false);
  }, []);

  return (
    <>
      <div>
        <div className={responsiveBox}>
          <Header imageSrc={back_arrow} alt="뒤로가기" title="신발검색" nav="/shoes-registry"></Header>
          <SearchBox />
          <MainContainer />
          <TextFooter />
        </div>
      </div>
    </>
  );
};
export default TextSearch;
