import { useEffect, useState } from 'react';
import { hamburger_menu, sidemenu_list, sidemenu_plus } from '../../assets/assets';
import SidemenuList from '../../components/sidemenu/SidemenuList';
import {
  hamburgerIconBox,
  sidemenuHeaderContainer,
  sidemenuDimmed,
  sidemenuContainer,
  sidemenuNewChatContainer,
  newChatText,
  sidemenuListsContainer,
  sidemenuListsBox,
  sidemenuListsTitle,
  plusButtonBox,
  sidemenuMypageMoveContainer,
} from './sidemenu.css';
import SidemenuMypageLinks from './SidemenuMypageLinks';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Button from '../common/button/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

type SideMenuProps = {
  onClose: () => void;
};

type ChatHistory = {
  id: string;
  botResponse: string;
  keywords: string;
};

const SideMenu = ({ onClose }: SideMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user); // 사용자가 로그인되어 있으면 true, 아니면 false
    });

    return () => {
      document.body.style.overflow = 'auto';
      unsubscribe(); // Firebase 인증 상태 변경 구독 해제
    };
  }, [auth]);

  // const [chatData, setChatData] = useState<ChatHistory | null>(null);
  // const [error, setError] = useState<string | null>(null);

  // Firestore에서 가져올 문서의 ID
  // const documentId = '-O7DMW-cqjs1-EBsl2WX'; // 실제 Firestore에서 존재하는 ID를 입력

  // const fetchChatHistory = async () => {
  //   try {
  //     console.log('Fetching document with ID:', documentId); // documentId를 콘솔에 출력
  //     const docRef = doc(db, 'chatHistory', documentId); // Firestore에서 문서 참조
  //     const docSnap = await getDoc(docRef); // 문서 데이터를 가져옴

  //     if (docSnap.exists()) {
  //       console.log('Document data:', docSnap.data()); // 문서 데이터를 콘솔에 출력
  //       const chatData = docSnap.data() as ChatHistory;
  //       setChatData(chatData); // 데이터를 상태에 저장
  //     } else {
  //       console.log('No such document!');
  //       setError('No such document!');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching document:', err);
  //     setError('Failed to fetch chat history');
  //   }
  // };

  // useEffect(() => {
  //   fetchChatHistory(); // 컴포넌트가 마운트되면 데이터 가져오기
  // }, []);

  const handleLoginClick = () => {
    onClose(); // 모달 닫기
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleNavigateChatbot = () => {
    onClose();
    navigate('/chatbot');
  };

  return (
    <>
      <section className={sidemenuDimmed} onClick={onClose}>
        <div className={sidemenuContainer} onClick={e => e.stopPropagation()}>
          {/* 헤더 */}
          <article className={sidemenuHeaderContainer}>
            <button className={hamburgerIconBox} onClick={onClose}>
              <img src={hamburger_menu} alt="hamburger_menu" />
            </button>
          </article>
          {/* 새 채팅 */}

          {/* <div>
            {error && <p>{error}</p>}
            {chatData ? (
              <div>
                <p>Chat ID: {chatData.id}</p>
                <p>Bot Response: {chatData.botResponse}</p>
                <p>Keywords: {chatData.keywords}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div> */}

          <article className={sidemenuNewChatContainer}>
            <button className={plusButtonBox} onClick={handleNavigateChatbot}>
              <img src={sidemenu_plus} alt="sidemenu_plus" />
              <p className={newChatText}>새 채팅</p>
            </button>
          </article>
          {/* 리스트 */}
          <article className={sidemenuListsContainer}>
            <h3 className={sidemenuListsTitle}>오늘</h3>
            <ul className={sidemenuListsBox}>
              <SidemenuList iconSrc={sidemenu_list} text="최근 가장 인기있는 여성 운동화" />
              <SidemenuList iconSrc={sidemenu_list} text="비오는 날 신기 좋은 레인부츠 추천" />
            </ul>
            <h3 className={sidemenuListsTitle}>지난 7일</h3>
            <ul className={sidemenuListsBox}>
              <SidemenuList iconSrc={sidemenu_list} text="여름 슬리퍼 추천" />
              <SidemenuList iconSrc={sidemenu_list} text="가벼운 러닝화" />
              <SidemenuList iconSrc={sidemenu_list} text="20대 여성이 많이 찾는 브랜드" />
            </ul>
          </article>
          {/* mypage 링크 또는 로그인 버튼 */}
          <article className={sidemenuMypageMoveContainer}>
            {isLoggedIn ? <SidemenuMypageLinks /> : <Button onClick={handleLoginClick} text="로그인" width="100%" />}
          </article>
        </div>
      </section>
    </>
  );
};

export default SideMenu;
