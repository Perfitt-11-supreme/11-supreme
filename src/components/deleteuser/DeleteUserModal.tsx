import { deleteUser } from 'firebase/auth';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { close } from '../../assets/assets';
import { auth, db } from '../../firebase/firebase';
import useUserStore from '../../stores/useUserStore';
// import { TUser } from '../../types/user';
import { shareContainer, shareDescription, shareTextWrap, shareTitle } from '../common/share-modal/shareModal.css';
import ToastMessage from '../toastmessage/toastMessage';
import { deleteButton, undoButton } from './deleteUserModal.css';
import { signupWrap } from '../signup/signup.css';

type DeleteUserModalProps = {
  isOpen: boolean; //부모로부터 전달받은 isModalOpen 상태
  onClose: () => void;
};

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose }) => {
  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleDeleteUser = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;

        //Firestore에서 해당 uid를 가진 모든 문서 삭제하는 함수
        const deleteUserData = async () => {
          const deleteCollectionDocs = async (collectionName: string) => {
            const collectionRef = collection(db, collectionName);
            const q = query(collectionRef, where('uid', '==', uid));
            const querySnapshot = await getDocs(q);

            // querySnapshot.forEach(async doc => {
            //   await deleteDoc(doc.ref); //문서 삭제
            // });
            // 각 문서를 삭제할 때 Promise를 수집하여, 모두 완료될 때까지 대기 - 하윤(최근본, 좋아요 작업 후 회원탈퇴 에러 해결)
            await Promise.all(querySnapshot.docs.map(doc => deleteDoc(doc.ref)));
          };

          //컬렉션에서 해당 uid를 가진 모든 문서 삭제
          const collections = ['users', 'myshoes', 'myViewed', 'myLiked'];
          await Promise.all(collections.map(collection => deleteCollectionDocs(collection))); //비동기 병렬 처리
        };

        // //탈퇴한 사용자 정보 띄우기 위함
        // const userDocRef = doc(db, 'users', user.uid);
        // const userDoc = await getDoc(userDocRef);

        // const userData: TUser = {
        //   ...userDoc.data(),
        // };

        // console.error('탈퇴한 사용자:', userData);

        await deleteUserData(); //Firestore에서 해당 uid를 가진 모든 문서 삭제
        await deleteUser(user); //Authentication에서 해당 uid를 가진 사용자 인증 데이터 삭제

        //사용자 정보 비우기
        setUser(null);

        //탈퇴 후 이동
        setToastMessage({ message: '회원탈퇴가 완료되었습니다.', duration: 3000 });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch {
      // console.error('회원탈퇴 실패:', error);
      setToastMessage({ message: '회원탈퇴 중 문제가 발생했습니다.', duration: 3000 });
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      <div style={{ position: 'relative' }}>
        {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={signupWrap}
              style={{ justifyContent: 'center', alignItems: 'center' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
            >
              <motion.div
                className={shareContainer}
                style={{ zIndex: 1000 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={e => e.stopPropagation()}
              >
                <div className={shareTextWrap}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className={shareTitle}>정말 탈퇴하시겠습니까?</p>
                    <motion.img
                      src={close}
                      onClick={onClose}
                      style={{ cursor: 'pointer' }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>
                  <p className={shareDescription}>
                    탈퇴하기 버튼 선택 시, 계정 정보와 저장된 데이터는 삭제되며 복구되지 않습니다.
                  </p>
                </div>
                <button className={deleteButton} onClick={handleDeleteUser}>
                  탈퇴하기
                </button>
                <button className={undoButton} onClick={onClose} style={{ marginTop: '-8px' }}>
                  취소
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default DeleteUserModal;
