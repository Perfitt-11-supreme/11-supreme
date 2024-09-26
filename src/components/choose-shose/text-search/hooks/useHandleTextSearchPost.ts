import { useMutation } from '@tanstack/react-query';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import { textShoseSearchAPI } from '../../../../api/searchRequests';
import { TProduct } from '../../../../types/product';
import useProductStore from '../../../../stores/useProductsStore';
import useSelectItemStore from '../../../../stores/useSelectItemStore';

export const useHandleTextSearchPost = () => {
  const { text, setLoading, setFocus, setSubmit, setPostText } = useTextSearchStore();
  const { setProducts } = useProductStore();
  const { resetItem } = useSelectItemStore();

  const handleTextSearchPost = useMutation({
    mutationFn: (data: string) => {
      setLoading(true);
      setFocus(false);
      setSubmit(true);
      resetItem();
      return textShoseSearchAPI(data);
    },
    onSuccess: response => {
      console.log('키워드 전송 성공');

      const products: TProduct[] = response.data.products;
      setProducts(products);
      setLoading(false);
      setPostText(text);
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
