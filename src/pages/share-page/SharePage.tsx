import { onValue, ref } from 'firebase/database';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { arrow_right, chatCircle } from '../../assets/assets';
import BrandRecommendation from '../../components/chatbot/brand-recommendation/BrandRecommendation';
import ChatBotBubble from '../../components/chatbot/chatbot-bubble/ChatBotBubble';
import {
  productRecommendPreviewContainer,
  productRecommendPreviewMore,
  productRecommendPreviewMoreIcon,
  productRecommendPreviewWrap,
} from '../../components/chatbot/product-recommendation-preview/productRecommendationPreview.css';
import UserBubble from '../../components/chatbot/user-bubble/UserBubble';
import { userBubble, userBubbleWrap } from '../../components/chatbot/user-bubble/userBubble.css';
import Button from '../../components/common/button/Button';
import ProductRecommendationCard from '../../components/common/product-recommendation-card/ProductRecommendationCard';
import { database } from '../../firebase/firebase'; // Firebase 초기화 파일
import { chatBotCardWrap } from '../chatbot-page/chatBotPage.css';
import LoadingPage from '../loading-page/loadingPage';
import {
  sharePageBubbleContainer,
  sharePageButtonContainer,
  sharePageContainer,
  sharePageDate,
  sharePageTextContainer,
  sharePageTitle,
} from './sharePage.css';

// 데이터 타입 정의
type Product = {
  productId: string;
  brand: string;
  modelName: string;
  image: string;
};

type Brand = {
  brand: string;
  description: string;
  link: string;
  thumbnail: string;
};

type ChatItem = {
  keywords: string;
  userQuestion: string;
  botResponse: string;
  products: Product[];
  brands: Brand[] | null;
  imageUrl?: string;
  timestamp: Date;
};

const SharePage = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id를 가져옴
  const [productData, setProductData] = useState<ChatItem | null>(null); // 상태의 타입을 ChatItem | null로 설정
  const navigate = useNavigate();
  const handleStartFitTalk = () => {
    navigate('/', { replace: true });
  };
  const isSharePage = location.pathname.startsWith('/share/');

  useEffect(() => {
    const fetchData = () => {
      const productRef = ref(database, `sharedChatHistory/${id}`); // 해당 아이디에 맞는 경로 설정
      onValue(
        productRef,
        snapshot => {
          const data = snapshot.val();
          if (data) {
            setProductData(data); // 데이터를 상태에 저장
          } else {
            console.error('데이터가 없습니다.');
            setProductData(null); // 데이터가 없을 경우 null로 설정
          }
        },
        error => {
          console.error('데이터 불러오기 에러:', error);
        }
      );
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className={sharePageContainer}>
        <div className={sharePageTextContainer}>
          <div>
            <img src={chatCircle} alt="chat icon" />
          </div>
          <p className={sharePageTitle}>{productData ? productData.keywords : <LoadingPage />}</p>
          <p className={sharePageDate}>
            {' '}
            {productData?.timestamp
              ? new Date(productData.timestamp).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : null}
          </p>
        </div>
        <div className={sharePageBubbleContainer}>
          {productData ? (
            <>
              {productData.userQuestion ? (
                <UserBubble bubbleContent={productData.userQuestion} />
              ) : (
                <div className={userBubbleWrap}>
                  <div className={userBubble}>
                    <img src={productData.imageUrl} alt="User Question Image" />
                  </div>
                </div>
              )}
              <ChatBotBubble bubbleContent={productData.botResponse} />
              <div className={chatBotCardWrap}>
                <div className={productRecommendPreviewWrap}>
                  <motion.ul
                    className={productRecommendPreviewContainer}
                    drag="x"
                    dragConstraints={{ left: -60, right: 0 }}
                  >
                    {/* 제품 렌더링 */}
                    {productData.products &&
                      productData.products.length > 0 &&
                      productData.products.map(item => (
                        <li key={item.productId}>
                          <ProductRecommendationCard product={item} />
                        </li>
                      ))}
                    {/* 브랜드 렌더링 */}
                    {productData.brands && productData.brands.length > 0 && id && (
                      <div>
                        <BrandRecommendation brands={productData.brands} shareId={id} />
                      </div>
                    )}
                    {!isSharePage && (
                      <div>
                        <div className={productRecommendPreviewMore}>
                          <img src={arrow_right} className={productRecommendPreviewMoreIcon} alt="more" />
                          <p style={{ fontSize: '9px', marginTop: '6px' }}>더보기</p>
                        </div>
                      </div>
                    )}
                  </motion.ul>
                </div>
              </div>
            </>
          ) : (
            <LoadingPage /> // 데이터가 없을 경우 대체 UI
          )}
        </div>
        <div className={sharePageButtonContainer}>
          <Button text="핏톡 시작하기" onClick={handleStartFitTalk} width="100%" />
        </div>
      </div>
    </>
  );
};

export default SharePage;
