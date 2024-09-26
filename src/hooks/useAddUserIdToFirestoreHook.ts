// import { useEffect } from 'react';
// import { doc, addDoc, collection } from 'firebase/firestore';
// import useUserStore from '../stores/useUserStore'; // Zustand store에서 user 상태 가져옴
// import { db } from '../firebase/firebase';

// // Firestore에 uid 추가하는 로직을 포함한 커스텀 훅
// const useAddUserIdToFirestore = (productId: string) => {
//   const { user } = useUserStore(state => state); // Zustand에서 로그인된 user 정보 가져옴

//   useEffect(() => {
//     console.log('User from Zustand:', user); // 로그인한 사용자의 user 정보 콘솔에 출력

//     if (user && user.uid) {
//       const addUserIdToFirestore = async () => {
//         try {
//           const docRef = doc(db, 'myproducts', productId); // 문서 참조
//           const collectionRef = collection(docRef, 'liked'); // liked 컬렉션 참조

//           // Firestore 문서에 uid 추가
//           await addDoc(collectionRef, {
//             uid: user.uid, // 로그인한 사용자의 uid 추가
//           });

//           console.log('User ID added to Firestore successfully!');
//         } catch (error) {
//           console.error('Error adding User ID to Firestore:', error);
//         }
//       };

//       addUserIdToFirestore();
//     } else {
//       console.error('User is not logged in or uid is missing');
//     }
//   }, [user, productId]); // user 또는 productId가 변경될 때만 실행
// };

// export default useAddUserIdToFirestore;
