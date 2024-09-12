import { useQuery } from '@tanstack/react-query';
import { shoesRecommendAPI } from '../../../../api/chatRequests';
import { more_arrow } from '../../../../assets/assets';
import LoadingPage from '../../../../pages/loading-page/loadingPage';
import { TProduct } from '../../../../types/product';
import RecommendBottom from './RecommendBottom';
import ItemBox from './itembox/ItemBox';
import { fullContainer, textTop } from './itembox/itemBox.css';


const RecommendBox = () => {

  //맞춤 상품 추천
  const { data: shoesRecommendData, isLoading: shoesRecommendIsLoading, error: shoesRecommendError } = useQuery({
    queryKey: ['shoesRecommend'],
    queryFn: async () => {
      try {
        const response = await shoesRecommendAPI()
        console.log('맞춤 상품 추천 데이터 확인', response.data)
        return response.data
      } catch (error) {
        console.error('맞춤 상품 불러오기 에러', error)
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,

  })

  if (shoesRecommendIsLoading) return <LoadingPage />
  if (shoesRecommendError) return <div>error:{shoesRecommendError?.message}</div>



  return (
    <div className={fullContainer}>
      <div className={textTop}>맞춤 상품 추천</div>
      {shoesRecommendData.map((shoesData: TProduct) => (
        <ItemBox key={shoesData.productId} image={shoesData.image} brand={shoesData.brand} modelName={shoesData.modelName} />
      ))}
      <RecommendBottom text="더보기" imageSrc={more_arrow} />
    </div>
  );
};

export default RecommendBox;
