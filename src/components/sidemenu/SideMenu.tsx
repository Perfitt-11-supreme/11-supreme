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
import useChatHistory from '../../hooks/useChatHistory';
import { deleteDoc, doc } from 'firebase/firestore';
import { database, db } from '../../firebase/firebase';
import { child, ref, remove } from 'firebase/database';

type SideMenuProps = {
  onClose: () => void;
};

type ChatHistoryProps = {
  id: string;
  keywords: string;
  timestamp: string;
};

type ChatHistoryListProps = SideMenuProps & {
  ChatHistory: ChatHistoryProps[];
};

const SideMenu = ({ onClose, ChatHistory }: ChatHistoryListProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatHistoryState, setChatHistoryState] = useState('');
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

  const { chatHistory } = useChatHistory();

  const handleLoginClick = () => {
    onClose(); // 모달 닫기
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleNavigateChatbot = () => {
    onClose();
    navigate('/chatbot');
  };

  // 특정 ID 데이터를 삭제하는 함수
  const deleteData = async (id: string) => {
    // const dataRef = ref(database, `chatHistory/${id}`);
    const dataRef = child(ref(database, 'chatHistory'), id); // 하위 ID 경로를 참조
    // await remove(dataRef);
    try {
      await remove(dataRef); // 데이터를 비동기로 삭제
      console.log('데이터가 성공적으로 삭제되었습니다.');
      setChatHistoryState(prev => prev.filter(chat => chat.id !== id)); // 삭제 후 상태에서 해당 항목 제거
    } catch (error) {
      console.error('데이터 삭제 중 오류 발생:', error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log('Deleting id:', id); // 삭제할 id 확인
    if (id) {
      try {
        await deleteData(id);
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    } else {
      console.error('id가 정의되지 않았습니다.');
    }
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
              {chatHistory.map(chat => (
                <SidemenuList
                  iconSrc={sidemenu_list}
                  key={chat.id}
                  id={chat.id}
                  keywords={chat.keywords}
                  timestamp={chat.timestamp}
                  handleDelete={handleDelete}
                />
              ))}
              {/* {chatHistory.map(chat => {
                console.log('Chat ID:', chat.id); // chat.id 확인
                return (
                  <SidemenuList
                    iconSrc={sidemenu_list}
                    key={chat.id}
                    id={chat.id}
                    keywords={chat.keywords}
                    timestamp={chat.timestamp}
                    handleDelete={handleDelete}
                  />
                );
              })} */}
            </ul>
            <h3 className={sidemenuListsTitle}>지난 7일</h3>
            <ul className={sidemenuListsBox}>
              {/* <SidemenuList iconSrc={sidemenu_list} text="여름 슬리퍼 추천" />
              <SidemenuList iconSrc={sidemenu_list} text="가벼운 러닝화" />
              <SidemenuList iconSrc={sidemenu_list} text="20대 여성이 많이 찾는 브랜드" /> */}
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
