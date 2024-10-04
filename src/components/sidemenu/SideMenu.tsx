import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prefitt_logo2, sidemenu_list, sidemenu_plus } from '../../assets/assets';
import { default as SideMenuList, default as SidemenuList } from '../../components/sidemenu/SidemenuList';
import { useChatCompletion } from '../../hooks/useChatCompletionHook';
import useChatHistory from '../../hooks/useChatHistoryHook';
import SideMenuSkeleton from '../sidemenu-skeleton/SideMenuSkeleton';
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

const SideMenu = ({ onClose }: SideMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
  const [deletedChatIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const { handleNewChat } = useChatCompletion();
  const { chatHistory, deleteChatHistory, chatHistoryIsLoading } = useChatHistory();
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

  // 비슷한데.. 합치면 안되나
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          console.log('Firestore uid:', user.uid); // Firestore에서 가져온 uid 확인
          setCurrentUserUid(user.uid); // Firestore에서 uid를 가져옴
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserData();
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

  const filteredTodayChatHistory = useMemo(() =>
    chatHistory
      .filter(chat => {
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

  const filtered7DaysChatHistory = useMemo(() =>
    chatHistory
      .filter(chat => {
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

  // if (chatHistoryIsLoading) return <SideMenuSkeleton />




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
                  {chatHistoryIsLoading ? (
                    <div style={{ marginTop: '15px' }}>
                      <SideMenuSkeleton />
                    </div>

                  ) : (
                    <div className={sidemenuListsItem3ScrollAuto}>
                      <ul
                        className={sidemenuListsBox}
                        style={{
                          display: filteredTodayChatHistory.length === 0 ? 'none' : 'flex',
                        }}
                      >
                        {filteredTodayChatHistory.map(
                          chat =>
                            !deletedChatIds.includes(chat.id) && ( // 삭제된 ID가 아닐 경우에만 렌더링
                              <SidemenuList
                                key={chat.id}
                                iconSrc={sidemenu_list}
                                shareId={chat.shareId}
                                id={chat.id}
                                keywords={chat.keywords}
                                timestamp={chat.timestamp}
                                onClose={onClose}
                                handleDelete={deleteChatHistory} // 삭제 함수 전달
                              />
                            )
                        )}
                      </ul>
                    </div>
                  )}
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
                  {chatHistoryIsLoading ? (
                    <SideMenuSkeleton />
                  ) : (
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
                              <SideMenuList
                                key={chat.id}
                                iconSrc={sidemenu_list}
                                id={chat.id}
                                shareId={chat.shareId}
                                keywords={chat.keywords}
                                timestamp={chat.timestamp}
                                handleDelete={deleteChatHistory} // 삭제 함수 전달
                                onClose={onClose}
                              />
                            )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            </>
          ) : (
            null
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
