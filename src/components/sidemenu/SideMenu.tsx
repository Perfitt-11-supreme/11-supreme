import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prefitt_logo2, sidemenu_list, sidemenu_plus } from '../../assets/assets';
import { default as SideMenuList, default as SidemenuList } from '../../components/sidemenu/sidemenu-list/SidemenuList';
import { useChatCompletion } from '../../hooks/useChatCompletionHook';
import useChatHistory from '../../hooks/useChatHistoryHook';
import SideMenuSkeleton from '../sidemenu-skeleton/SideMenuSkeleton';
import SidemenuMypageLinks from './sidemenu-mypage-link/SidemenuMypageLink';
import { sidemenuUserProfileLogin } from './sidemenu-mypage-link/sidemenuMypageLink.css';
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

type SideMenuProps = {
  onClose: () => void;
};

const SideMenu = ({ onClose }: SideMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const { handleNewChat } = useChatCompletion();
  const { chatHistory, deleteChatHistory, chatHistoryIsLoading, chatHistoryIsFetching } = useChatHistory();
  // 현재 UTC 시간으로 오늘 날짜 계산
  // UTC 시간
  const utcToday = useMemo(() => {
    const today = new Date();
    return new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  }, []);

  const sevenDaysAgo = new Date(utcToday.getTime() - 7 * 24 * 60 * 60 * 1000); // UTC 기준 7일 전 시간

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
      if (user) {
        setCurrentUserUid(user.uid);
      }
    });

    return () => {
      document.body.style.overflow = 'auto';
      unsubscribe();
    };
  }, [auth]);



  const handleLoginClick = useCallback(() => {
    onClose();
    navigate('/login');
  }, [onClose, navigate]);

  const handleNavigateChatbot = useCallback(async () => {
    const newChatId = await handleNewChat();
    navigate(`/chat/${newChatId}`);
    onClose();
  }, [handleNewChat, navigate, onClose]);

  const filteredTodayChatHistory = useMemo(
    () =>
      chatHistory
        .filter(chat => {
          if (!chat.timestamp) return false;
          const chatDate = new Date(chat.timestamp);
          return (
            currentUserUid &&
            chatDate.getUTCFullYear() === utcToday.getUTCFullYear() &&
            chatDate.getUTCMonth() === utcToday.getUTCMonth() &&
            chatDate.getUTCDate() === utcToday.getUTCDate()
          );
        })
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [chatHistory, currentUserUid, utcToday]
  );

  const filtered7DaysChatHistory = useMemo(
    () =>
      chatHistory
        .filter(chat => {
          if (!chat.timestamp) return false;
          const chatDate = new Date(chat.timestamp);
          return (
            currentUserUid &&
            chatDate > sevenDaysAgo &&
            chatDate < utcToday &&
            (chatDate.getUTCFullYear() !== utcToday.getUTCFullYear() ||
              chatDate.getUTCMonth() !== utcToday.getUTCMonth() ||
              chatDate.getUTCDate() !== utcToday.getUTCDate())
          );
        })
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [chatHistory, currentUserUid, sevenDaysAgo, utcToday]
  );


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
          <article className={sidemenuNewChatContainer}>
            <button className={plusButtonBox} onClick={handleNavigateChatbot}>
              <img src={sidemenu_plus} alt="sidemenu_plus" />
              <p className={newChatText}>새 채팅</p>
            </button>
          </article>

          {isLoggedIn && (
            <>
              {/* 새 채팅 */}
              <article className={sidemenuListsContainer}>
                {(chatHistoryIsLoading || chatHistoryIsFetching) ? (
                  <div style={{ marginTop: '15px' }}>
                    <SideMenuSkeleton />
                  </div>
                ) : (
                  <>
                    {filteredTodayChatHistory.length > 0 && (
                      <div>
                        <h3 className={sidemenuListsTitle}>오늘</h3>
                        <div className={sidemenuListsItem3ScrollAuto}>
                          <ul className={sidemenuListsBox}>
                            {filteredTodayChatHistory.map(chat => (
                              <SidemenuList
                                key={chat.id}
                                iconSrc={sidemenu_list}
                                shareId={chat.shareId}
                                id={chat.id}
                                keywords={chat.keywords}
                                timestamp={chat.timestamp}
                                onClose={onClose}
                                handleDelete={deleteChatHistory}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {filtered7DaysChatHistory.length > 0 && (
                      <div>
                        <h3 className={sidemenuListsTitle}>지난 7일</h3>
                        <div className={sidemenuListsItem5ScrollAuto}>
                          <ul className={sidemenuListsBox}>
                            {filtered7DaysChatHistory.map(chat => (
                              <SideMenuList
                                key={chat.id}
                                iconSrc={sidemenu_list}
                                id={chat.id}
                                shareId={chat.shareId}
                                keywords={chat.keywords}
                                timestamp={chat.timestamp}
                                handleDelete={deleteChatHistory}
                                onClose={onClose}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </article>
            </>
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
