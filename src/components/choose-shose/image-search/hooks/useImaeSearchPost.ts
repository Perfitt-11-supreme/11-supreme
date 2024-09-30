// 리액트
import { useMutation } from '@tanstack/react-query';
// apu
import { ImageShoseSearchAPI } from '../../../../api/searchRequests';
// 타입
import { TProduct } from '../../../../types/product';
// Zustand
import useProductStore from '../../../../stores/useProductsStore';
import useSelectItemStore from '../../../../stores/useSelectItemStore';
import useImageSearchStore from '../../../../stores/useImageSearchStore';

// 매개변수 true : 비슷한 상품 보기  false : 촬영한 이미지 포스트
const useImageSearchPost = () => {
  const { setProducts } = useProductStore();
  const { setSelectProduct } = useSelectItemStore();
  const { isSuccess, setAnalyze, setSimilar, setSuccess } = useImageSearchStore();

  const handleImageSearchPost = useMutation({
    mutationFn: (data: string) => {
      setAnalyze(true);
      return ImageShoseSearchAPI(data);
    },
    onSuccess: response => {
      console.log('키워드 전송 성공');

      const products: TProduct[] = response.data.products;
      setProducts(products);
      setAnalyze(false);
      if (isSuccess) {
        setSelectProduct(null);
        setSuccess(false);
        setSimilar(true);
      } else {
        setSelectProduct(products[0]);
        setSuccess(true);
      }
    },
    onError: error => {
      console.error('이미지 서칭 실패:', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨');
    },
  });

  return handleImageSearchPost;
};

export default useImageSearchPost;
