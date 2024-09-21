import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hamburger_menu, sidemenu_list, sidemenu_plus } from '../../assets/assets';
import SidemenuList from '../../components/sidemenu/SidemenuList';
import useChatHistoryHook from '../../hooks/useChatHistoryHook';
import Button from '../common/button/Button';
import SidemenuMypageLinks from './SidemenuMypageLinks';
import {
  hamburgerIconBox,
  newChatText,
  plusButtonBox,
  sidemenuContainer,
  sidemenuDimmed,
  sidemenuHeaderContainer,
  sidemenuListsBox,
  sidemenuListsContainer,
  sidemenuListsItem3ScrollAuto,
  sidemenuListsItem5ScrollAuto,
  sidemenuListsTitle,
  sidemenuMypageMoveContainer,
  sidemenuNewChatContainer,
} from './sidemenu.css';

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

const SideMenu = ({ onClose }: ChatHistoryListProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deletedChatIds, setDeletedChatIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const { chatHistory, deleteChatHistory } = useChatHistoryHook();
  console.log('chatHistoryData', chatHistory);

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

  const handleLoginClick = () => {
    onClose(); // 모달 닫기
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleNavigateChatbot = () => {
    navigate('/chatbot');
    onClose();
  };
  console.log('handleNavigateChatbot', handleNavigateChatbot);

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
            <div>
              <h3 className={sidemenuListsTitle}>오늘</h3>
              <div className={sidemenuListsItem3ScrollAuto}>
                <ul className={sidemenuListsBox}>
                  {chatHistory
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // timestamp로 내림차순 정렬
                    .map(
                      chat =>
                        !deletedChatIds.includes(chat.id) && ( // 삭제된 ID가 아닐 경우에만 렌더링
                          <SidemenuList
                            key={chat.id}
                            iconSrc={sidemenu_list}
                            id={chat.id}
                            keywords={chat.keywords}
                            timestamp={chat.timestamp}
                            handleDelete={deleteChatHistory} // 삭제 함수 전달
                          />
                        )
                    )}
                </ul>
              </div>
            </div>
            <div>
              <h3 className={sidemenuListsTitle}>지난 7일</h3>
              <div className={sidemenuListsItem5ScrollAuto}>
                <ul className={sidemenuListsBox}>
                  {chatHistory
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // timestamp로 내림차순 정렬
                    .map(
                      chat =>
                        !deletedChatIds.includes(chat.id) && ( // 삭제된 ID가 아닐 경우에만 렌더링
                          <SidemenuList
                            key={chat.id}
                            iconSrc={sidemenu_list}
                            id={chat.id}
                            keywords={chat.keywords}
                            timestamp={chat.timestamp}
                            handleDelete={deleteChatHistory} // 삭제 함수 전달
                          />
                        )
                    )}
                </ul>
              </div>
            </div>
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
