import useUidAddStore from '../stores/useUidAddStore';
import useUserStore from '../stores/useUserStore';

export const onUserFirstLogin = async (uid: string, additionalData: { email: string; userName: string }) => {
  try {
    const { addUidToFirestore } = useUidAddStore();
    const { setUser } = useUserStore();

    await addUidToFirestore(uid);

    setUser({ uid, email: additionalData.email, userName: additionalData.userName });
    // console.log('사용자 Firestore 초기화 성공');
  } catch (error) {
    console.error('사용자 Firestore 초기화 실패: ', error);
  }
};
