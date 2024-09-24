import { useMutation, useQuery } from '@tanstack/react-query';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, push, ref, set } from 'firebase/database';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import { chatKeywordsAPI, keywordsListAPI, recommendQuestionAPI } from '../../api/chatRequests';
import { hamburger_menu } from '../../assets/assets';
import { auth, database, db } from '../../firebase/firebase';
import { useChatCompletion } from '../../hooks/useChatCompletionHook';
import BridgePage from '../../pages/bridge-page/bridgePage';
import { keywordWrap } from '../../pages/chatbot-page/chatBotPage.css';
import LoadingPage from '../../pages/loading-page/loadingPage';
import useBrandStore from '../../stores/useBrandStore';
import useChatStore from '../../stores/useChatStore';
import useModalStore from '../../stores/useModalStore';
import useProductDetailStore from '../../stores/useProductDetailStore';
import useProductStore, { ProductStoreState } from '../../stores/useProductsStore';
import useUserStore from '../../stores/useUserStore';
import { responsiveBox } from '../../styles/responsive.css';
import { ChatItem } from '../../types/chatItem';
import { TKeyWordsData } from '../../types/keywords';
import BrandPLP from '../chatbot/brand-plp/BrandPLP';
import BrandRecommendation from '../chatbot/brand-recommendation/BrandRecommendation';
import ChatBotBubble from '../chatbot/chatbot-bubble/ChatBotBubble';
import ProductRecommendationPreview from '../chatbot/product-recommendation-preview/ProductRecommendationPreview';
import ProductRecommendation from '../chatbot/product-recommendation/ProductRecommendation';
import UserBubble from '../chatbot/user-bubble/UserBubble';
import { userBubble, userBubbleText, userBubbleWrap } from '../chatbot/user-bubble/userBubble.css';
import Button from '../common/button/Button';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import KeywordCard from '../common/keyword-card/KeywordCard';
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

type KeywordsList = string[];

const LoginHello = () => {
  const { setProducts } = useProductStore.getState();
  const { selectedBrand, setBrands, setSelectedBrand } = useBrandStore();
  const { isShareModalOpen, isKeywordModalOpen, setKeywordModalOpen } = useModalStore();
  const { showBridgePage, selectedProductLink } = useProductDetailStore();
  const { setMessage } = useProductStore();
  const { chatHistory, setCurrentKeywords, setChatHistory } = useChatStore();
  const { user, setUser } = useUserStore();

  const { handleQuestionSelect } = useChatCompletion();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [showProductRecommendation, setShowProductRecommendation] = useState(false);
  const [selectedChatItemId, setSelectedChatItemId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [hasSelectedKeywords, setHasSelectedKeywords] = useState(false);
  const [hasSetInitialKeywords, setHasSetInitialKeywords] = useState(false);
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentChatId } = useChatStore()
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
        console.log(' 키워드 리스트 데이터 확인용', response);
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
      console.log('키워드 전송 성공:', response);
      setKeywordModalOpen(false);
      setMessage(response.data.message);
      setProducts(response.data.products);

      if (user?.uid) {
        const newChatRef = push(ref(database, `chatHistory/${user.uid}`));
        const newChatItem = {
          userQuestion: `${formattedKeywords}`,
          botResponse: response.data.message,
          products: response.data.products,
          brands: [],
          keywords: formattedKeywords,
          timestamp: new Date().toISOString(),
        };
        set(newChatRef, newChatItem);

        // 선택된 키워드를 사용자 데이터에 저장
        set(ref(database, `users/${user.uid}/selectedKeywords`), selectedKeywords);
      }
      setHasSelectedKeywords(true);
    },
    onError: error => {
      console.error('키워드 전송 실패:', error);
    },
  });

  /**키워드 선택 함수 */
  const handleKeywordSelect = (keyword: string) => {
    setSelectedKeywords(
      prevSelected =>
        prevSelected.includes(keyword)
          ? prevSelected.filter(item => item !== keyword) // 선택 해제
          : [...prevSelected, keyword] // 선택 추가
    );
  };

  // 키워드 제출 함수
  const handleSubmit = () => {
    const chat: TKeyWordsData = { keywords: selectedKeywords };
    keywordMutation.mutate(chat);
    setKeywordModalOpen(false);
    setShowWelcomeMessage(false);
    setHasSetInitialKeywords(true);

    if (user?.uid) {
      saveSelectedKeywordsToFirestore(user.uid, selectedKeywords);
    }
  };

  // Firestore에 selectedKeywords 저장
  const saveSelectedKeywordsToFirestore = async (uid: string, keywords: string[]): Promise<void> => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { selectedKeywords: keywords });
  };
  //키워드 포맷
  const formattedKeywords = selectedKeywords.join(', ');

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
    setHasAskedQuestion(true);
    localStorage.setItem('hasAskedQuestion', 'true');
  };

  useEffect(() => {
    const storedHasAskedQuestion = localStorage.getItem('hasAskedQuestion');
    if (storedHasAskedQuestion === 'true') {
      setHasAskedQuestion(true);
    }
  }, []);

  // 사용자 인증 및 키워드 로드
  useEffect(() => {
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
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
        });
        setIsAuthenticated(true);

        // Firestore에서 selectedKeywords 확인
        const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
        if (userDoc.exists() && userDoc.data().selectedKeywords) {
          setSelectedKeywords(userDoc.data().selectedKeywords);
          setHasSetInitialKeywords(true);
          setKeywordModalOpen(false);
        } else {
          // 처음 로그인하는 경우
          setKeywordModalOpen(true);
        }
        setIsLoading(false);
      } else {
        // 사용자가 로그아웃한 경우
        setUser(null);
        setIsAuthenticated(false);
        setHasSetInitialKeywords(false);
        setSelectedKeywords([]);
      }
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, [setUser]);

  // Firebase에서 채팅 기록 불러오기
  useEffect(() => {
    if (user?.uid && currentChatId) {
      const messagesRef = ref(database, `users/${user.uid}/chats/${currentChatId}/messages`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const chatItems: ChatItem[] = [];

        snapshot.forEach((messageSnapshot) => {
          const messageId = messageSnapshot.key;
          const message = messageSnapshot.val();
          if (messageId && message) {
            chatItems.push({
              ...message,
              id: messageId,
            });
          }
        });

        chatItems.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        if (chatItems.length > 0) {
          setChatHistory(chatItems);
          const lastChatItem = chatItems[chatItems.length - 1];
          if (lastChatItem.products) {
            setProducts(lastChatItem.products);
          }
          if (lastChatItem.brands) {
            setBrands(lastChatItem.brands);
          }
          setCurrentKeywords(lastChatItem.keywords);
        } else {
          setChatHistory([]);
          setProducts([]);
          setBrands([]);
          setCurrentKeywords('');
        }
      });

      return () => unsubscribe();
    } else {
      setChatHistory([]);
      setProducts([]);
      setBrands([]);
      setCurrentKeywords('');
    }
  }, [user, currentChatId, setProducts, setBrands, setChatHistory, setCurrentKeywords]);


  // 브릿지 페이지 타이머 설정
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

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isRecommendQuestionLoading) return <LoadingPage />;
  if (recommendQuestionError) return <div>error:{recommendQuestionError?.message}</div>;
  if (isKeywordsListLoading) return <LoadingPage />;
  if (keywordsListError) return <div>error:{keywordsListError?.message}</div>;

  return (
    <div className={responsiveBox}>
      <div className={fullContainer}>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />
        <div className={loginHelloContainer}>
          <div ref={chatContainerRef} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            {' '}
            {/* 채팅 기록 컨테이너 */}
            <div style={{ marginTop: '20px' }}>
              {showWelcomeMessage ? (
                <div className={userBubbleWrap}>
                  <ChatBotBubble
                    bubbleContent={`${user?.userName}님, 가입을 환영합니다!\n선택하신 키워드에 따라 ${user?.userName}님께 맞춤형 상품을\n추천해드립니다! 관심 있는 키워드를 골라주세요.`}
                  />
                </div>
              ) : (
                // ChatBotBox는 키워드 선택 후에만 표시
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
        {!hasAskedQuestion && (chatHistory.length === 0 || hasSetInitialKeywords) && (
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

        {chatHistory.length > 0 && hasAskedQuestion && (
          <Modal height="83vh" initialHeight="25px">
            {selectedBrand ? (
              <BrandPLP />
            ) : showProductRecommendation ? (
              <ProductRecommendation keywords={getSelectedKeywords()} />
            ) : null}
          </Modal>
        )}
        {!isKeywordModalOpen && <ChatbotSearchInput />}

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
                    isSelected={selectedKeywords.includes(item)}
                  />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
              <Button text={`${selectedKeywords.length}개 선택`} onClick={handleSubmit} width="100%" />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default LoginHello;
