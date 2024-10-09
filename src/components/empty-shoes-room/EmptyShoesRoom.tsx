import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { noshoes, plus } from '../../assets/assets';
import { db } from '../../firebase/firebase';
import LoadingPage from '../../pages/loading-page/loadingPage';
import { ShoesList, UserData } from '../../types/shoesroom';
import Button from '../common/button/Button';
import ToastMessage from '../toastmessage/toastMessage';
import {
  buttonDiv,
  buttonImage,
  container,
  countp,
  fontBold,
  imagebutton,
  imageplusbutton,
  noShoesDiv,
  optiondiv,
  select,
  shoesdiv,
  visuallyHidden,
} from './emptyshoesroom.css';
import Header from './header/Header';
import UserProfile from './user-profile/UserProfile';

const EmptyShoesRoom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shoesList, setShoesList] = useState<ShoesList[]>([]);
  const [selected, setSelected] = useState('latest');
  const [userData, setUserData] = useState<UserData | null>(null);
  const location = useLocation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  useEffect(() => {
    if (location.state) {
      if (location.state?.deleteToastMessage) {
        setToastMessage(location.state.deleteToastMessage);
      } else if (location.state?.registryToastMessage) {
        setToastMessage(location.state.registryToastMessage);
      } else if (location.state?.editToastMessage) {
        setToastMessage(location.state.editToastMessage);
      }
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [toastMessage]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        fetchUserData(user.uid);
        fetchShoesData(selected);
      } else {
        console.log('No user is signed in');
        setIsLoading(false);
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 정리
  }, [selected, auth]);

  const navigate = useNavigate();

  const handleRegistry = () => {
    navigate('/shoes-registry');
  };

  const handleShoesInfo = (shoesId: string) => {
    navigate(`/shoesinfo/${shoesId}`);
  };

  const fetchUserData = async (uid: string) => {
    try {
      const usersCollection = collection(db, 'users');
      const userQuery = query(usersCollection, where('uid', '==', uid));
      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach(doc => {
        const data = doc.data() as UserData;
        setUserData(data); // 사용자 데이터 상태에 저장
        // setIsLoading(false);
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchShoesData = async (order: string) => {
    setIsLoading(true);
    if (user?.uid) {
      try {
        const shoesCollection = collection(db, 'myshoes');
        const uid = user?.uid; // 현재 사용자의 UID
        const shoesQuery = query(shoesCollection, where('uid', '==', uid));

        let selectedSort;
        if (order === 'latest') {
          selectedSort = query(shoesQuery, orderBy('timestamp', 'desc'));
        } else if (order === 'registered') {
          selectedSort = query(shoesQuery, orderBy('timestamp', 'asc'));
        } else {
          selectedSort = shoesQuery;
        }

        const querySnapshot = await getDocs(selectedSort);
        const shoes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ShoesList[];

        if (shoesList.length !== shoes.length || shoesList !== shoes) {
          setShoesList(shoes); // 상태 업데이트
          setIsLoading(false);
        }
      } catch (e) {
        console.error('Error fetching shoes data: ', e);
        setIsLoading(false);
      }
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    if (user) {
      const uid = user?.uid;
      fetchUserData(uid);
      fetchShoesData(selected);
    }
  }, [user, selected]);

  useEffect(() => {
    shoesList.forEach(shoe => {
      if (shoe.image) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = shoe.image;
        link.as = 'image';
        document.head.appendChild(link);
      }
    });
  }, [shoesList]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className={container}>
        {toastMessage && <ToastMessage message={toastMessage} duration={3000} />}
        <Header title="신발장" customNavigate={() => navigate('/chat')} />
        <UserProfile userData={userData} />
        {shoesList.length > 0 ? (
          <>
            <div className={optiondiv}>
              <p className={countp}>
                <span className={fontBold}>총 {shoesList.length}</span>개
              </p>
              <label htmlFor="selectBox" className={visuallyHidden}>
                셀렉트박스
              </label>
              <select id="selectBox" className={select} value={selected} onChange={handleSelectChange}>
                <option value="latest">최신순</option>
                <option value="registered">등록순</option>
              </select>
            </div>
            <div className={shoesdiv}>
              <button className={imageplusbutton} onClick={handleRegistry}>
                <img src={plus} alt="등록" />
              </button>
              {shoesList.map(shoe => (
                <button key={shoe.id} className={imagebutton} onClick={() => handleShoesInfo(shoe.id)}>
                  <img className={buttonImage} src={shoe.image} alt={shoe.modelName} />
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className={noShoesDiv}>
              <img src={noshoes} />
            </div>
            <div className={buttonDiv}>
              <Button text="신발 등록하기" onClick={handleRegistry} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmptyShoesRoom;
