// useAuth.js
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import useModalStore from '../stores/useModalStore';
import useUIStateStore from '../stores/useUIStateStore';
import useUserStore from '../stores/useUserStore';


export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useUserStore();
  const { setKeywordModalOpen } = useModalStore();
  const { setHasSetInitialKeywords, setSelectedKeywords } = useUIStateStore()
  
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

  return { isAuthenticated, isLoading,setIsAuthenticated,setIsLoading };
};