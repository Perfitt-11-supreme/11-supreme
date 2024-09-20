import { useNavigate } from 'react-router-dom';
import useSelectItemStore from '../../../../stores/useSelectItemStore';

// 매개변수  비슷한 상품인지 아닌지 확인
const useHandleImageSearchNavigate = (bol: boolean) => {
  const { selectProduct, setSelectProduct, setIsSelected, setSelectComplet } = useSelectItemStore();
  const navigate = useNavigate();

  const handleImageSearchNavigate = () => {
    setIsSelected(null);
    setSelectComplet(true);
    if (bol && selectProduct) {
      navigate('/shoes-registry');
    } else if (!bol) {
      setSelectProduct(selectProduct);
      navigate('/shoes-registry');
    }
  };

  return handleImageSearchNavigate;
};

export default useHandleImageSearchNavigate;
