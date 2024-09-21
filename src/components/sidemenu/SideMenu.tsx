import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prefitt_logo2, sidemenu_list, sidemenu_plus } from '../../assets/assets';
import SidemenuList from '../../components/sidemenu/SidemenuList';
import useChatHistoryHook from '../../hooks/useChatHistoryHook';
import SidemenuMypageLinks from './SidemenuMypageLinks';
import {
  logoIcon,
  logoIconBox,
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
import { sidemenuUserProfileLogin } from './sidemenuMypageLinks.css';

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
  // 현재 UTC 시간으로 오늘 날짜 계산
  const today = new Date();
  const utcToday = new Date(today.getTime() + today.getTimezoneOffset() * 60 * 1000); // UTC 시간
  const sevenDaysAgo = new Date(utcToday.getTime() - 7 * 24 * 60 * 60 * 1000); // UTC 기준 7일 전 시간
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

  // chatHistory.timestamp 오늘날짜 필터링
  const filteredTodayChatHistory = chatHistory
    .filter(chat => {
      const chatDate = new Date(chat.timestamp); // chat.timestamp를 UTC 시간으로 처리
      // UTC 기준으로 오늘 날짜와 동일한지 비교 (년, 월, 일만 비교)
      return (
        chatDate.getUTCFullYear() === utcToday.getUTCFullYear() &&
        chatDate.getUTCMonth() === utcToday.getUTCMonth() &&
        chatDate.getUTCDate() === utcToday.getUTCDate()
      );
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // timestamp로 내림차순 정렬

  // chatHistory.timestamp 오늘 제외 7일이내 필터링
  const filtered7DaysChatHistory = chatHistory
    .filter(chat => {
      const chatDate = new Date(chat.timestamp); // chat.timestamp를 UTC 시간으로 처리
      // 7일 이내이고 오늘은 제외 (UTC 기준으로 비교)
      return (
        chatDate > sevenDaysAgo &&
        (chatDate.getUTCFullYear() !== utcToday.getUTCFullYear() ||
          chatDate.getUTCMonth() !== utcToday.getUTCMonth() ||
          chatDate.getUTCDate() !== utcToday.getUTCDate())
      );
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // timestamp로 내림차순 정렬

  const handleDeleteChat = (chatId: string) => {
    setDeletedChatIds(prev => [...prev, chatId]); // 삭제된 ID 추가
  };

  return (
    <>
      <section className={sidemenuDimmed} onClick={onClose}>
        <div className={sidemenuContainer} onClick={e => e.stopPropagation()}>
          {/* 헤더 */}
          <article className={sidemenuHeaderContainer}>
            <button className={logoIconBox} onClick={onClose}>
              <img className={logoIcon} src={prefitt_logo2} alt="hamburger_menu" />
            </button>
          </article>
          {isLoggedIn ? (
            <>
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
                  <h3
                    className={sidemenuListsTitle}
                    style={{
                      display: filteredTodayChatHistory.length === 0 ? 'none' : 'flex',
                    }}
                  >
                    오늘
                  </h3>
                  <div className={sidemenuListsItem3ScrollAuto}>
                    <ul
                      className={sidemenuListsBox}
                      style={{
                        display: filteredTodayChatHistory.length === 0 ? 'none' : 'flex',
                      }}
                    >
                      {filteredTodayChatHistory
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
                  <h3
                    className={sidemenuListsTitle}
                    style={{
                      display: filtered7DaysChatHistory.length === 0 ? 'none' : 'flex',
                    }}
                  >
                    지난 7일
                  </h3>
                  <div className={sidemenuListsItem5ScrollAuto}>
                    <ul
                      className={sidemenuListsBox}
                      style={{
                        display: filtered7DaysChatHistory.length === 0 ? 'none' : 'flex',
                      }}
                    >
                      {filtered7DaysChatHistory.map(
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
            </>
          ) : (
            <></>
          )}
          {/* mypage 링크 또는 로그인 버튼 */}
          <article className={sidemenuMypageMoveContainer}>
            {isLoggedIn ? (
              <SidemenuMypageLinks />
            ) : (
              <button className={sidemenuUserProfileLogin} onClick={handleLoginClick}>
                로그인
              </button>
            )}
          </article>
        </div>
      </section>
    </>
  );
};

export default SideMenu;
