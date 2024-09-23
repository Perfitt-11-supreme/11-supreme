import { useQuery } from '@tanstack/react-query';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import { recommendQuestionAPI } from '../../api/chatRequests';
import { hamburger_menu } from '../../assets/assets';
import { database } from '../../firebase/firebase';
import { useChatCompletion } from '../../hooks/useChatCompletionHook';
import BridgePage from '../../pages/bridge-page/bridgePage';
import LoadingPage from '../../pages/loading-page/loadingPage';
import useBrandStore from '../../stores/useBrandStore';
import useChatStore from '../../stores/useChatStore';
import useModalStore from '../../stores/useModalStore';
import useProductDetailStore from '../../stores/useProductDetailStore';
import useProductStore, { ProductStoreState } from '../../stores/useProductsStore';
import useUserStore from '../../stores/useUserStore';
import { responsiveBox } from '../../styles/responsive.css';
import { ChatItem } from '../../types/chatItem';
import BrandPLP from '../chatbot/brand-plp/BrandPLP';
import BrandRecommendation from '../chatbot/brand-recommendation/BrandRecommendation';
import ChatBotBubble from '../chatbot/chatbot-bubble/ChatBotBubble';
import ProductRecommendationPreview from '../chatbot/product-recommendation-preview/ProductRecommendationPreview';
import ProductRecommendation from '../chatbot/product-recommendation/ProductRecommendation';
import UserBubble from '../chatbot/user-bubble/UserBubble';
import { userBubble, userBubbleText, userBubbleWrap } from '../chatbot/user-bubble/userBubble.css';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import Modal from '../common/modal/Modal';
import RecommendedQuestionCard from '../common/recommended-question-card/RecommendedQuestionCard';
import ShareModal from '../common/share-modal/ShareModal';
import { fullContainer, loginHelloContainer, recommendedquestioncardContainer } from './login.css';
import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import RecommendBox from './loginchatbot/recommendbox/RecommendBox';

type TQuestions = {
  question: string;
};

type QuestionList = TQuestions[];

type Brand = {
  brand: string;
  description: string;
  link: string;
  thumbnail: string;
};



const LoginHello = () => {
  const { setProducts } = useProductStore.getState();
  const { selectedBrand, setBrands, setSelectedBrand } = useBrandStore();
  const { isShareModalOpen } = useModalStore();
  const { showBridgePage, selectedProductLink } = useProductDetailStore();
  const [showProductRecommendation, setShowProductRecommendation] = useState(false);
  const [selectedChatItemId, setSelectedChatItemId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser } = useUserStore();
  const { chatHistory, setCurrentKeywords, setChatHistory } = useChatStore();
  const { handleQuestionSelect } = useChatCompletion();

  // 추천 질문 불러오는 함수
  const {
    data: keywordsData,
    isLoading: isRecommendQuestionLoading,
    error: recommendQuestionError,
  } = useQuery<QuestionList>({
    queryKey: ['keywords'],
    queryFn: async () => {
      try {
        const response = await recommendQuestionAPI();
        console.log('추천 질문 데이터 확인용', response);
        return response.data;
      } catch (error) {
        console.error('추천 질문 불러오기 에러', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });


  // 채팅 기록 변경 시 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    setShowProductRecommendation(false);
  };

  const handleProductMoreClick = (chatItemId: string) => {
    setShowProductRecommendation(true);
    setSelectedBrand(null);
    setSelectedChatItemId(chatItemId);

    const selectedChat = chatHistory.find(chat => chat.id === chatItemId);
    if (selectedChat && selectedChat.products) {
      setProducts(selectedChat.products as ProductStoreState['products']);
    } else {
      // 선택된 채팅 항목에 제품이 없는 경우 빈 배열을 설정
      setProducts([]);
    }
  };

  const getSelectedKeywords = () => {
    const selectedChat = chatHistory.find(chat => chat.id === selectedChatItemId);
    return selectedChat ? selectedChat.keywords : '';
  };



  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let userName = 'User';

        if (firebaseUser.displayName) {
          // 소셜 로그인의 경우
          userName = firebaseUser.displayName;
        } else {
          // 일반 이메일 로그인의 경우 Firestore에서 사용자 이름 가져오기
          try {
            const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              userName = userDoc.data().userName || 'User';
            }
          } catch (error) {
            console.error('Firestore에서 사용자 정보를 가져오는 중 오류 발생:', error);
          }
        }

        setUser({
          uid: firebaseUser.uid,
          userName: userName,
          // 필요한 다른 사용자 정보를 여기에 추가
        });
        setIsAuthenticated(true);
      } else {
        // 사용자가 로그아웃한 경우
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, [setUser]);


  // Firebase에서 채팅 기록 불러오기
  useEffect(() => {
    if (user?.uid) {
      const chatRef = ref(database, `chatHistory/${user.uid}`);
      const unsubscribe = onValue(chatRef, snapshot => {
        const chatItems: ChatItem[] = [];
        snapshot.forEach(childSnapshot => {
          const data = childSnapshot.val();
          const id = childSnapshot.key;
          if (id) {
            chatItems.push({ ...data, id });
          }
        });

        if (chatItems.length > 0) {
          setChatHistory(chatItems);
          const lastChatItem = chatItems[chatItems.length - 1];
          if (lastChatItem && lastChatItem.products) {
            setProducts(lastChatItem.products as ProductStoreState['products']);
          }
          if (lastChatItem && lastChatItem.brands) {
            setBrands(lastChatItem.brands);
          }
          setCurrentKeywords(lastChatItem.keywords);
        }
      });


      return () => unsubscribe();
    } else {

      setChatHistory([]);
      setProducts([]);
      setBrands([]);
      setCurrentKeywords('');
    }
  }, [user, setProducts, setBrands]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showBridgePage && selectedProductLink) {
      timer = setTimeout(() => {
        window.location.href = selectedProductLink;
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showBridgePage, selectedProductLink]);

  if (showBridgePage) {
    return <BridgePage />;
  }

  if (isRecommendQuestionLoading) return <LoadingPage />;
  if (recommendQuestionError) return <div>error:{recommendQuestionError?.message}</div>;

  return (
    <div className={responsiveBox}>
      <div className={fullContainer}>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />
        <div className={loginHelloContainer}>
          <div ref={chatContainerRef} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            {' '}
            {/* 채팅 기록 컨테이너 */}
            <div style={{ marginTop: '20px' }}>
              <ChatBotBox
                text={[`반갑습니다 ${user?.userName}님!`, `${user?.userName}님을 위한 맞춤 상품을 추천해 드릴게요.`]}
              />
            </div>
            <div style={{ marginLeft: '44px' }}>
              <RecommendBox />
            </div>
            {chatHistory.map((chat, index) => (
              <Fragment key={index}>
                {chat.imageUrl ? (
                  <div className={userBubbleWrap}>
                    <div className={userBubble}>
                      <img
                        src={chat.imageUrl}
                        alt="Uploaded"
                        style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '10px' }}
                        className={userBubbleText}
                      />
                    </div>
                  </div>
                ) : (
                  <UserBubble bubbleContent={chat.userQuestion} />
                )}

                <ChatBotBubble bubbleContent={chat.botResponse} />
                {chat.brands && chat.brands.length > 0 && chat.id && (
                  <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -50 }}
                    whileTap={{ cursor: 'grabbing' }}
                    className={recommendedquestioncardContainer}
                  >
                    <BrandRecommendation brands={chat.brands} shareId={chat.shareId} onBrandClick={handleBrandClick} />
                  </motion.div>
                )}
                {chat.products && chat.products.length > 0 && chat.id && (
                  <div style={{ marginLeft: '28px' }}>
                    <ProductRecommendationPreview
                      products={chat.products}
                      shareId={chat.shareId}
                      onMoreClick={() => handleProductMoreClick(chat.id)}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        {chatHistory.length === 0 && (
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -550 }}
            whileTap={{ cursor: 'grabbing' }}
            className={recommendedquestioncardContainer}
          >
            {keywordsData &&
              keywordsData.map((question, index) => (
                <RecommendedQuestionCard
                  key={index}
                  text={question.question}
                  onClick={() => handleQuestionSelect(question.question)}
                />
              ))}
          </motion.div>
        )}

        {chatHistory.length > 0 && (
          <Modal height="83vh" initialHeight="25px">
            {selectedBrand ? (
              <BrandPLP />
            ) : showProductRecommendation ? (
              <ProductRecommendation keywords={getSelectedKeywords()} />
            ) : null}
          </Modal>
        )}
        <ChatbotSearchInput />

        {isShareModalOpen && <ShareModal />}
      </div>
    </div>
  );
};

export default LoginHello;
