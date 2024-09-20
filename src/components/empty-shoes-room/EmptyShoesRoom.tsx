import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { noshoes, plus } from '../../assets/assets';
import Button from '../common/button/Button';
import Header from './header/Header';
import UserProfile from './user-profile/UserProfile';
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
} from './emptyshoesroom.css';
import { db } from '../../firebase/firebase';
import { responsiveBox } from '../../styles/responsive.css';
import ToastMessage from '../toastmessage/toastMessage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const EmptyShoesRoom = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [shoesList, setShoesList] = useState<any[]>([]);
  const [selected, setSelected] = useState('latest');
  const [userData, setUserData] = useState<any>(null);
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
    }
  }, [toastMessage]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        fetchUserData(user.uid);
        fetchShoesData(selected);
      } else {
        console.log('No user is signed in');
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 정리
  }, [selected]);

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
        const data = doc.data();
        setUserData(data); // 사용자 데이터 상태에 저장
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchShoesData = async (order: string) => {
    try {
      const shoesCollection = collection(db, 'myshoes');

      let selectedSort;
      if (order === 'latest') {
        selectedSort = query(shoesCollection, orderBy('timestamp', 'desc'));
      } else if (order === 'registered') {
        selectedSort = query(shoesCollection, orderBy('timestamp', 'asc'));
      } else {
        selectedSort = shoesCollection;
      }

      const querySnapshot = await getDocs(selectedSort);
      const shoes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (shoesList.length !== shoes.length || shoesList !== shoes) {
        setShoesList(shoes); // 상태 업데이트
        setIsTrue(shoes.length > 0);
      }
    } catch (e) {
      console.error('Error fetching shoes data: ', e);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    if (user) {
      const uid = user.uid;
      fetchUserData(uid);
      fetchShoesData(selected);
    }
  }, [user, selected]);
  return (
    <div className={responsiveBox}>
      <div className={container}>
        {toastMessage && <ToastMessage message={toastMessage} duration={3000} />}
        <Header title="신발장" customNavigate={() => navigate('/hello')} />
        <UserProfile userData={userData} />
        {isTrue ? (
          <>
            <div className={optiondiv}>
              <p className={countp}>
                <span className={fontBold}>총 {shoesList.length}</span>개
              </p>
              <select className={select} value={selected} onChange={handleSelectChange}>
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
                  <img className={buttonImage} src={shoe.image} alt={shoe.name} />
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
    </div>
  );
};

export default EmptyShoesRoom;
