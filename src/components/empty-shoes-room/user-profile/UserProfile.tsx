import { useEffect, useState } from 'react';
import { user_profile } from '../../../assets/assets';
import { descP, nameP, userDiv, userImage } from './userprofile.css';
import { db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

type UserData = {
  userName?: string;
  username?: string;
  shoeSize?: number;
  sizeType?: string;
  uid: string;
};

type UserProfileProps = {
  userData: UserData | null; // userData는 UserData 타입이거나 null일 수 있음
};

const UserProfile = ({ userData }: UserProfileProps) => {
  const [profileImage, setProfileImage] = useState<string>(user_profile); // 기본 이미지로 설정

  // Firestore에서 프로필 이미지 가져오기
  useEffect(() => {
    const fetchUserProfileImage = async () => {
      if (userData?.uid) {
        const userDocRef = doc(db, 'users', userData.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileImage(data.profileImage || user_profile); // 기본 이미지로 대체
        }
      }
    };

    fetchUserProfileImage();
  }, [userData]);

  return (
    <div className={userDiv}>
      <div className={userImage}>
        <img src={profileImage} alt="user_profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div>
        <p className={nameP}>{userData?.userName || userData?.username}</p>
        <p className={descP}>
          평소 신는 사이즈 | {userData?.shoeSize} {userData?.sizeType}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
