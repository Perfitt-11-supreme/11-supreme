// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import useUidAddStore from '../stores/useUidAddStore';
// import useUserStore from '../stores/useUserStore';

// export const onUserFirstLogin = async (email: string, password: string) => {
//   try {
//     // Firebase 인증 인스턴스 가져오기
//     const auth = getAuth();

//     // 이메일과 비밀번호로 로그인
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     if (user) {
//       const { addUidToFirestore } = useUidAddStore();
//       const { setUser } = useUserStore();

//       // Firestore에 UID 추가
//       await addUidToFirestore(user.uid);

//       // user.email이 null일 수 있으므로 undefined로 변환
//       setUser({ uid: user.uid, email: user.email ?? undefined });
//     }
//   } catch (error) {
//     console.error('로그인 실패: ', error);
//   }
// };
import useUidAddStore from '../stores/useUidAddStore';
import useUserStore from '../stores/useUserStore';

export const onUserFirstLogin = async (uid: string, additionalData: { email: string; userName: string }) => {
  try {
    const { addUidToFirestore } = useUidAddStore();
    const { setUser } = useUserStore();

    await addUidToFirestore(uid);

    setUser({ uid, email: additionalData.email, userName: additionalData.userName });
    console.log('사용자 Firestore 초기화 성공');
  } catch (error) {
    console.error('사용자 Firestore 초기화 실패: ', error);
  }
};
