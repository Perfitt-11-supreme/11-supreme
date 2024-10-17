import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'; // Firestore 관련 함수 import
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { back_arrow, mypage_heart, mypage_shoes_room, user_profile, user_profile_upload } from '../../assets/assets';
import Header from '../../components/common/header/Header';
import DeleteUserModal from '../../components/deleteuser/DeleteUserModal';
import { db } from '../../firebase/firebase';
import { responsiveBox } from '../../styles/responsive.css';
import {
  borderLine,
  myInfoBox,
  myInfoContainer,
  myInfoKey,
  myInfoServiceBox,
  myInfoServiceTermBox,
  myInfoServiceTermButton,
  myInfoTitle,
  myInfoValue,
  mypageButton,
  mypageButtonBox,
  mypageButtonIcon,
  mypageContainer,
  profileImageBox,
  userProfileGreeting,
  userProfileGreetingContainer,
  userProfileIconBox,
  userProfileImageContainer,
  userProfileName,
  userProfileNameTextBold,
  userProfileUploadIconBox,
} from './mypage.css';
import MypageServiceButton from '../../components/mypage/mypage-service-button/MypageServiceButton';
import ToastMessage from '../../components/toastmessage/toastMessage';

const Mypage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>(user_profile); // 기본 이미지로 설정
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNavigateShoesroom = () => {
    navigate('/empty-shoesroom');
  };
  const handleNavigateLiked = () => {
    navigate('/liked');
  };
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
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        fetchUserDatas();
      } else {
        console.log('No user is signed in');
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 정리
  }, []);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && userData?.uid) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `profileImages/${userData.uid}`);

        // 파일 업로드
        await uploadBytes(storageRef, file);

        // 업로드 후 이미지 URL 가져오기
        const imageUrl = await getDownloadURL(storageRef);
        setProfileImage(imageUrl); // 상태에 URL 저장

        // Firestore에 프로필 이미지 URL 저장
        const userDocRef = doc(db, 'users', userData.uid);
        await setDoc(userDocRef, { profileImage: imageUrl }, { merge: true });

        console.log('Firestore에 이미지 URL 저장 완료:', imageUrl);
      } catch (error) {
        console.error('Firestore에 이미지 저장 중 오류 발생:', error);
      }
    }
  };

  const handlePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 숨겨진 파일 입력창을 열기
    }
  };

  const handleShowToast = () => {
    setToastMessage({ message: '이용약관 준비 중입니다.', duration: 3000 });
  };

  return (
    <>
      <div className={responsiveBox} style={{ overflow: 'hidden' }}>
        <section className={mypageContainer}>
          <Header imageSrc={back_arrow} alt="back arrow" nav="/chat" />
          <article className={userProfileImageContainer}>
            <div className={userProfileIconBox}>
              <div className={profileImageBox} onClick={handlePictureClick}>
                <img
                  src={profileImage}
                  alt="user_profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={userProfileUploadIconBox} onClick={handlePictureClick}>
                <img src={user_profile_upload} alt="user_profile_upload" />
              </div>
              {/* 숨겨진 파일 입력창 */}
              <input
                ref={fileInputRef} // 파일 입력창에 대한 참조
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange} // 파일이 선택되면 handleFileChange 호출
              />
            </div>
          </article>
          <article className={userProfileGreetingContainer}>
            <p className={userProfileGreeting}>안녕하세요!</p>
            <p className={userProfileName}>
              <span className={userProfileNameTextBold}>
                {userData
                  ? userData?.userName ||
                    userData?.username
                      .split('')
                      .map((char: string, index: number) => <span key={index}>{char}&nbsp;</span>)
                  : '-'}
              </span>
              님
            </p>
          </article>
          <article>
            <hr className={borderLine} />
            <div className={mypageButtonBox}>
              <button className={mypageButton} type="button" onClick={handleNavigateLiked}>
                <img className={mypageButtonIcon} src={mypage_heart} alt="mypage_heart" />
                <span>좋아요</span>
              </button>
              <button className={mypageButton} type="button" onClick={handleNavigateShoesroom}>
                <img className={mypageButtonIcon} src={mypage_shoes_room} alt="mypage_shoes_room" />
                <span>신발장</span>
              </button>
            </div>
            <hr className={borderLine} />
          </article>
          <article className={myInfoContainer}>
            <h3 className={myInfoTitle}>내 정보</h3>
            <div className={myInfoBox}>
              <div className={myInfoKey}>
                <p>이름</p>
                <p>성별</p>
                <p>생년월일</p>
                <p>평소사이즈</p>
              </div>
              <div className={myInfoValue}>
                <p>{userData ? userData?.userName || userData?.username : '-'}</p>
                <p>
                  {userData ? (userData.gender === 'female' ? '여성' : userData.gender === 'male' ? '남성' : '-') : '-'}
                </p>

                <p>
                  {userData
                    ? `${userData?.birthDate.year}.${userData?.birthDate.month}.${userData?.birthDate.day}`
                    : '-'}
                </p>
                <p>{userData?.shoeSize && userData?.sizeType ? `${userData.shoeSize} ${userData.sizeType}` : '-'}</p>
              </div>
            </div>
          </article>
          <article>
            <hr className={borderLine} />
            <div className={myInfoServiceBox}>
              <MypageServiceButton />
            </div>
            <div className={myInfoServiceTermBox}>
              <div className={myInfoServiceTermButton} onClick={() => setIsDeleteUserModalOpen(true)}>
                회원탈퇴
              </div>
              <div className={myInfoServiceTermButton} onClick={handleShowToast}>
                고객약관
              </div>
              {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
            </div>
          </article>
        </section>
        {isDeleteUserModalOpen && (
          <DeleteUserModal isOpen={isDeleteUserModalOpen} onClose={() => setIsDeleteUserModalOpen(false)} />
        )}
      </div>
    </>
  );
};

export default Mypage;
