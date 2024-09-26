import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Firestore 관련 함수 import
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  back_arrow,
  mypage_arrow,
  mypage_heart,
  mypage_shose_room,
  user_profile,
  user_profile_upload,
} from '../../assets/assets';
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
  myInfoServiceButton,
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

const Mypage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>(user_profile); // 기본 이미지로 설정
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNavigateShoesroom = () => {
    navigate('/empty-shoesroom');
  };
  const handleNavigateLikedPage = () => {
    navigate('/likedpage');
  };
  console.log('userData in Mypage', userData);
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

  // 파일 선택 창을 여는 함수
  const handlePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 숨겨진 파일 입력창을 열기
    }
  };

  // 파일 선택 후 파일을 처리하는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 선택한 파일의 URL 생성
      setProfileImage(imageUrl); // 이미지 URL을 상태에 저장
      console.log('선택한 파일:', file);
    }
  };

  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  return (
    <>
      <div className={responsiveBox} style={{ overflow: 'hidden' }}>
        <section className={mypageContainer}>
          <Header imageSrc={back_arrow} alt="back arrow" nav="/hello" />
          <article className={userProfileImageContainer}>
            <div className={userProfileIconBox}>
              <div className={profileImageBox}>
                {/* 조건부 렌더링 */}
                {profileImage ? (
                  <img src={profileImage} alt="user_profile" /> // 업로드된 이미지가 있으면 보여줌
                ) : (
                  <img src={user_profile} alt="user_profile" /> // 업로드된 이미지가 없으면 기본 이미지
                )}
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
              <button className={mypageButton} type="button" onClick={handleNavigateLikedPage}>
                <img className={mypageButtonIcon} src={mypage_heart} alt="mypage_heart" />
                <span>좋아요</span>
              </button>
              <button className={mypageButton} type="button" onClick={handleNavigateShoesroom}>
                <img className={mypageButtonIcon} src={mypage_shose_room} alt="mypage_shose_room" />
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
              <div className={myInfoServiceButton}>
                <span>내 정보 수정</span>
                <img src={mypage_arrow} alt="mypage_arrow" />
              </div>
              <div className={myInfoServiceButton}>
                <span>비밀번호 변경</span>
                <img src={mypage_arrow} alt="mypage_arrow" />
              </div>
              <div className={myInfoServiceButton}>
                <span>고객센터</span>
                <img src={mypage_arrow} alt="mypage_arrow" />
              </div>
            </div>
            <div className={myInfoServiceTermBox}>
              <div className={myInfoServiceTermButton} onClick={() => setIsDeleteUserModalOpen(true)}>
                회원탈퇴
              </div>
              <div className={myInfoServiceTermButton}>고객약관</div>
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
