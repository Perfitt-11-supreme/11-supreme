import { useEffect, useState } from 'react';
import { user } from '../../../assets/assets';
import { descP, nameP, userButton, userDiv } from './userprofile.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { USER_COLLECTION, db } from '../../../firebase/firebase';
import { getAuth } from 'firebase/auth';

const UserProfile = () => {
  const [userData, setUserData] = useState<any>(null);
  console.log('d', userData);
  const fetchUserDatas = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        const USER_COLLECTION = collection(db, 'users');

        const userQuery = query(USER_COLLECTION, where('uid', '==', uid));
        const userSnapshot = await getDocs(userQuery);

        const usersData: any[] = [];
        userSnapshot.forEach(doc => {
          const data = doc.data();
          usersData.push(data);
        });

        if (usersData.length > 0) {
          setUserData(usersData[0]);
        } else {
          console.log('사용자 데이터를 찾을 수 없습니다.');
        }
      } else {
        console.log('사용자가 로그인하지 않았습니다.');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  useEffect(() => {
    fetchUserDatas();
  }, []);
  return (
    <>
      <div className={userDiv}>
        <button className={userButton}>
          <img src={user} />
        </button>
        <div>
          <p className={nameP}>{userData?.userName}</p>
          <p className={descP}>
            평소 신는 사이즈 | {userData?.shoeSize} {userData?.sizeType}
          </p>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
