import { useMutation, useQuery } from '@tanstack/react-query';
import { push, ref, set } from 'firebase/database';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import { chatKeywordsAPI, keywordsListAPI, recommendQuestionAPI } from '../../../api/chatRequests';
import { hamburger_menu } from '../../../assets/assets';
import { database, db } from '../../../firebase/firebase';
import { useAuth } from '../../../hooks/useAuthHook';
import { useChatCompletion } from '../../../hooks/useChatCompletionHook';
import useFetchChatHistory from '../../../hooks/useFetchChatHistoryHook';
import BridgePage from '../../../pages/bridge-page/bridgePage';
import { keywordWrap } from '../../../pages/chatbot-page/chatBotPage.css';
import LoadingPage from '../../../pages/loading-page/loadingPage';
import useBrandStore from '../../../stores/useBrandStore';
import useChatStore from '../../../stores/useChatStore';
import useModalStore from '../../../stores/useModalStore';
import useProductDetailStore from '../../../stores/useProductDetailStore';
import useProductStore, { ProductStoreState } from '../../../stores/useProductsStore';
import useUIStateStore from '../../../stores/useUIStateStore';
import useUserStore from '../../../stores/useUserStore';
import { TKeyWordsData } from '../../../types/keywords';
import { useBridgePage } from '../../../utils/bridgePageUtils';
import BrandPLP from '../../chatbot/brand-plp/BrandPLP';
import BrandRecommendation from '../../chatbot/brand-recommendation/BrandRecommendation';
import ChatBotBubble from '../../chatbot/chatbot-bubble/ChatBotBubble';
import ProductRecommendationPreview from '../../chatbot/product-recommendation-preview/ProductRecommendationPreview';
import ProductRecommendation from '../../chatbot/product-recommendation/ProductRecommendation';
import UserBubble from '../../chatbot/user-bubble/UserBubble';
import { userBubble, userBubbleText, userBubbleWrap } from '../../chatbot/user-bubble/userBubble.css';
import Button from '../../common/button/Button';
import ChatbotSearchInput from '../../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../../common/header/Header';
import KeywordCard from '../../common/keyword-card/KeywordCard';
import Modal from '../../common/modal/Modal';
import RecommendedQuestionCard from '../../common/recommended-question-card/RecommendedQuestionCard';
import ShareModal from '../../common/share-modal/ShareModal';
import ChatBotBox from '../loginchatbot/chatbotbox/ChatBotBox';
import RecommendBox from '../loginchatbot/recommendbox/RecommendBox';
import { loginHelloContainer, loginHelloFullContainer, recommendedquestioncardContainer } from './loginHello.css';

type TQuestions = {
  question: string;
};

type QuestionList = TQuestions[];

// type Brand = {
//   brand: string;
//   description: string;
//   link: string;
//   thumbnail: string;
// };

type KeywordsList = string[];

const LoginHello = () => {
  // 상태 공유
  const { setProducts } = useProductStore.getState();
  const { selectedBrand, setBrands, setSelectedBrand } = useBrandStore();
  const { isShareModalOpen, isKeywordModalOpen, setKeywordModalOpen } = useModalStore();
  const { showBridgePage, selectedProductLink } = useProductDetailStore();
  const { setMessage } = useProductStore();
  const { chatHistory, setCurrentKeywords, currentChatId } = useChatStore();
  const { user } = useUserStore();
  const {
    setShowChatBotAndRecommend,
    setHasSetInitialKeywords,
    selectedKeywords,
    showChatBotAndRecommend,
    hasSetInitialKeywords,
  } = useUIStateStore();

  // 커스텀 훅
  const { isLoading } = useAuth();
  const { handleQuestionSelect } = useChatCompletion();
  // state
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [showProductRecommendation, setShowProductRecommendation] = useState(false);
  const [selectedChatItemId, setSelectedChatItemId] = useState<string | null>(null);
  // const [hasSelectedKeywords, setHasSelectedKeywords] = useState(false);
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  // 사용자의 최초 로그인 여부를 확인하는 쿼리
  const { data: userLoginStatus, isLoading: isUserStatusLoading } = useQuery({
    queryKey: ['userLoginStatus', user?.uid],
    queryFn: async () => {
      if (!user?.uid) return null;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        return { isFirstLogin: true, hasSetKeywords: false };
      }
      const userData = userDoc.data();
      return {
        isFirstLogin: !userData.hasLoggedInBefore,
        hasSetKeywords: !!userData.selectedKeywords,
      };
    },
    enabled: !!user?.uid,
  });

  // Firestore에 myLiked와 myViewed 문서 추가
  useEffect(() => {
    const initializeUserCollections = async () => {
      if (user?.uid) {
        const likedDocRef = doc(db, 'myLiked', user.uid);
        const viewedDocRef = doc(db, 'myViewed', user.uid);

        try {
          // myLiked 컬렉션에 사용자 문서가 없으면 초기화
          const likedDoc = await getDoc(likedDocRef);
          if (!likedDoc.exists()) {
            await setDoc(likedDocRef, { uid: user.uid, products: {}, brands: {} });
            // console.log('myLiked 문서가 초기화되었습니다.');
          }

          // myViewed 컬렉션에 사용자 문서가 없으면 초기화
          const viewedDoc = await getDoc(viewedDocRef);
          if (!viewedDoc.exists()) {
            await setDoc(viewedDocRef, { uid: user.uid, products: {} });
            // console.log('myViewed 문서가 초기화되었습니다.');
          }
        } catch (error) {
          console.error('Firestore 초기화 중 오류 발생:', error);
        }
      }
    };

    initializeUserCollections();
  }, [user?.uid]);

  // 키워드 리스트 불러오기
  const {
    data: keywordsListData,
    isLoading: isKeywordsListLoading,
    error: keywordsListError,
  } = useQuery<KeywordsList>({
    queryKey: ['keywordsList'],
    queryFn: async () => {
      try {
        const response = await keywordsListAPI();
        // console.log(' 키워드 리스트 데이터 확인용', response);
        return response.data;
      } catch (error) {
        console.error('키워드 정보 불러오기 에러', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  // 키워드 전송 mutation
  const keywordMutation = useMutation({
    mutationFn: (data: TKeyWordsData) => chatKeywordsAPI(data),
    onSuccess: response => {
      // console.log('키워드 전송 성공:', response);
      setKeywordModalOpen(false);
      setMessage(response.data.message);
      setProducts(response.data.products);

      if (user?.uid) {
        const newChatRef = push(ref(database, `users/${user.uid}/chats/${currentChatId}/messages`));
        const newChatItem = {
          userQuestion: `${safeSelectedKeywords}`,
          botResponse: response.data.message,
          products: response.data.products,
          brands: [],
          keywords: safeSelectedKeywords,
          timestamp: new Date().toISOString(),
        };
        set(newChatRef, newChatItem);
      }
      // setHasSelectedKeywords(true);
    },
    onError: error => {
      console.error('키워드 전송 실패:', error);
    },
  });

  /**키워드 선택 함수 */
  const handleKeywordSelect = (keyword: string) => {
    useUIStateStore.setState(state => {
      const currentSelected = Array.isArray(state.selectedKeywords) ? state.selectedKeywords : [];
      const newSelected = currentSelected.includes(keyword)
        ? currentSelected.filter(item => item !== keyword)
        : [...currentSelected, keyword];
      return { selectedKeywords: newSelected };
    });
  };
  //키워드 포맷
  const safeSelectedKeywords = Array.isArray(selectedKeywords) ? selectedKeywords : [];

  // 키워드 제출 함수
  const handleSubmit = async () => {
    const chat: TKeyWordsData = { keywords: selectedKeywords };
    keywordMutation.mutate(chat);
    setKeywordModalOpen(false);
    setShowWelcomeMessage(false);
    setHasSetInitialKeywords(true);
    setShowChatBotAndRecommend(true);

    // Firestore에 selectedKeywords 저장
    if (user?.uid) {
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            selectedKeywords,
            hasLoggedInBefore: true,
          },
          { merge: true }
        );
        // console.log("User document updated successfully");
      } catch (error) {
        console.error('Error updating user document:', error);
      }
    }
  };

  // 추천 질문 불러오는 함수
  const {
    data: keywordsData,
    isLoading: isRecommendQuestionLoading,
    error: recommendQuestionError,
  } = useQuery<QuestionList>({
    queryKey: ['recommendedQuestions'],
    queryFn: async () => {
      try {
        const response = await recommendQuestionAPI();
        // console.log('추천 질문 데이터 확인용', response);
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

  // 브랜드 클릭 핸들러
  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    setShowProductRecommendation(false);
  };

  // 제품 더보기 클릭 핸들러
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

  // 선택된 키워드 가져오기
  const getSelectedKeywords = () => {
    const selectedChat = chatHistory.find(chat => chat.id === selectedChatItemId);
    return selectedChat ? selectedChat.keywords : '';
  };

  // 추천 질문 선택 핸들러
  const handleRecommendedQuestionSelect = (question: string) => {
    handleQuestionSelect(question);
  };

  // Firebase에서 채팅 기록 불러오기
  useFetchChatHistory(currentChatId);

  // 브릿지 페이지 타이머 설정
  useBridgePage(showBridgePage, selectedProductLink);

  // 채팅 기록 변경 시 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (!isUserStatusLoading && userLoginStatus) {
      setShowWelcomeMessage(true);
      if (userLoginStatus.isFirstLogin && !currentChatId) {
        setKeywordModalOpen(true);
      } else if (!userLoginStatus.hasSetKeywords) {
        setKeywordModalOpen(true);
      } else {
        setShowWelcomeMessage(false);
        setShowChatBotAndRecommend(false);
      }
    }
  }, [userLoginStatus, isUserStatusLoading, currentChatId]);

  useEffect(() => {
    // 새로운 채팅방에 들어왔을 때 상태 초기화
    setShowChatBotAndRecommend(false);
    setProducts([]);
    setBrands([]);
    setCurrentKeywords('');

    // 필요한 경우 다른 상태들도 초기화
    setShowWelcomeMessage(false);
    setHasAskedQuestion(false);
  }, [currentChatId]);

  useEffect(() => {
    // 컴포넌트 마운트 시 상태 초기화
    setShowChatBotAndRecommend(false);
    setProducts([]);
    setBrands([]);
    setCurrentKeywords('');
    setShowWelcomeMessage(false);
    setHasAskedQuestion(false);
    return () => {
      // 컴포넌트 언마운트 시 정리 작업
      // console.log("Component unmounted");
    };
  }, []);

  if (showBridgePage) {
    return <BridgePage />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isUserStatusLoading) return <LoadingPage />;
  if (isRecommendQuestionLoading) return <LoadingPage />;
  if (recommendQuestionError) return <div>error:{recommendQuestionError?.message}</div>;
  if (isKeywordsListLoading) return <LoadingPage />;
  if (keywordsListError) return <div>error:{keywordsListError?.message}</div>;

  return (
    <>
      <div className={loginHelloFullContainer}>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />
        <div className={loginHelloContainer}>
          <div ref={chatContainerRef}>
            {/* 채팅 기록 컨테이너 */}
            <div style={{ marginTop: '20px' }}>
              {showWelcomeMessage && (
                <div className={userBubbleWrap}>
                  <ChatBotBubble
                    bubbleContent={`${user?.userName}님, 가입을 환영합니다!\n선택하신 키워드에 따라 ${user?.userName}님께 맞춤형 상품을\n추천해드립니다! 관심 있는 키워드를 골라주세요.`}
                  />
                </div>
              )}
              {showChatBotAndRecommend && (
                <>
                  <ChatBotBox
                    text={[
                      `반갑습니다 ${user?.userName}님!`,
                      `${user?.userName}님을 위한 맞춤 상품을 추천해 드릴게요.`,
                    ]}
                  />
                  <div style={{ marginLeft: '44px' }}>
                    <RecommendBox />
                  </div>
                </>
              )}
            </div>
            {chatHistory.map((chat, index) => (
              <Fragment key={index}>
                {chat.imageUrl ? (
                  <div className={userBubbleWrap}>
                    <div className={userBubble}>
                      <img
                        src={chat.imageUrl}
                        alt="Uploaded"
                        style={{ maxWidth: '200px', maxHeight: '200px', width: '100%', height: 'auto' }}
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

        {!hasAskedQuestion && chatHistory.length === 0 && (
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
                  onClick={() => handleRecommendedQuestionSelect(question.question)}
                />
              ))}
          </motion.div>
        )}

        {!isKeywordModalOpen && <ChatbotSearchInput />}

        {chatHistory.length > 0 && (
          <Modal height="100vh" initialHeight="125px">
            {selectedBrand ? (
              <BrandPLP />
            ) : showProductRecommendation ? (
              <ProductRecommendation keywords={getSelectedKeywords()} />
            ) : null}
          </Modal>
        )}

        {/* 공유 모달  */}
        {isShareModalOpen && <ShareModal />}

        {!isLoading && isKeywordModalOpen && !hasSetInitialKeywords && (
          <Modal height="360px" title="관심 키워드">
            <div className={keywordWrap}>
              {Array.isArray(keywordsListData) &&
                keywordsListData.map((item, index) => (
                  <KeywordCard
                    key={index}
                    text={item}
                    onClick={() => handleKeywordSelect(item)}
                    isSelected={safeSelectedKeywords.includes(item)}
                  />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
              <Button text={`${selectedKeywords.length}개 선택`} onClick={handleSubmit} width="100%" />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default LoginHello;
