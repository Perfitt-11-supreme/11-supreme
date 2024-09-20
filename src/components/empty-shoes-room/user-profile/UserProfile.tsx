import { useEffect, useState } from 'react';
import { user } from '../../../assets/assets';
import { descP, nameP, userButton, userDiv } from './userprofile.css';
import { getDocs } from 'firebase/firestore';
import { USER_COLLECTION } from '../../../firebase/firebase';

const UserProfile = () => {
  const [userData, setUserData] = useState<any>(null);
  console.log('d', userData);
  const fetchUserDatas = async () => {
    try {
      const userSnapshot = await getDocs(USER_COLLECTION);
      userSnapshot.forEach(doc => {
        const data = doc.data();
        setUserData(data);
      });
    } catch (error) {
      console.error('Error fetching user names: ', error);
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
          <p className={nameP}>{userData?.username}</p>
          <p className={descP}>
            평소 신는 사이즈 | {userData?.shoeSize} {userData?.sizeType}
          </p>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
