import { useMutation } from '@tanstack/react-query';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import { textShoseSearchAPI } from '../../../../api/searchRequests';
import { TProduct } from '../../../../types/product';
import useProductStore from '../../../../stores/useProductsStore';

export const useHandleTextSearchPost = () => {
  const { text, setState } = useTextSearchStore();
  const { setProducts } = useProductStore();

  const handleTextSearchPost = useMutation({
    mutationFn: (data: string) => {
      setState({ isLoading: true, focus: false });
      return textShoseSearchAPI(data);
    },
    onSuccess: response => {
      console.log('키워드 전송 성공');

      const products: TProduct[] = response.data.products;
      setProducts(products);
      setState({ isLoading: false, postText: text, isSubmit: true });
    },
    onError: error => {
      console.error('이미지 서칭 실패:', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨');
    },
  });

  return { handleTextSearchPost };
};
