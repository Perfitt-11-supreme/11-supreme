import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
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

const EmptyShoesRoom = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [shoesList, setShoesList] = useState<any[]>([]);
  const [selected, setSelected] = useState('latest');
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback(() => {
    if (location.state?.deleteToastMessage) {
      setToastMessage(location.state.deleteToastMessage);
    } else if (location.state?.registryToastMessage) {
      setToastMessage(location.state.registryToastMessage);
    } else if (location.state?.editToastMessage) {
      setToastMessage(location.state.editToastMessage);
    }
  }, [location.state]);

  useEffect(() => {
    showToast();
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);
  console.log('Location state:', location.state); // 상태 확인용
  //   if (location.state?.deleteToastMessage) {
  //     setToastMessage(location.state.deleteToastMessage);
  //     const timer = setTimeout(() => setToastMessage(null), 3000);
  //     return () => clearTimeout(timer);
  //   }

  //   if (location.state?.registryToastMessage) {
  //     setToastMessage(location.state.registryToastMessage);
  //     const timer = setTimeout(() => setToastMessage(null), 3000);
  //     return () => clearTimeout(timer);
  //   }
  //   if (location.state?.editToastMessage) {
  //     setToastMessage(location.state.editToastMessage);
  //     const timer = setTimeout(() => setToastMessage(null), 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [location.state]);

  const navigate = useNavigate();

  const handleRegistry = () => {
    navigate('/shoes-registry');
  };

  const handleShoesInfo = (shoesId: string) => {
    navigate(`/shoesinfo/${shoesId}`);
  };

  const fetchShoesData = async (order: string) => {
    try {
      const shoesCollection = collection(db, 'myshoes');

      let selectedSort = query(shoesCollection);
      if (order === 'latest') {
        selectedSort = query(shoesCollection, orderBy('timestamp', 'desc'));
      } else if (order === 'registered') {
        selectedSort = query(shoesCollection, orderBy('timestamp', 'asc'));
      }
      const querySnapshot = await getDocs(selectedSort);
      const shoes = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log(doc.id, data);
        return { id: doc.id, ...data };
      });

      console.log('shoes: ', shoes);
      setShoesList(shoes);
      setIsTrue(shoes.length > 0);
    } catch (e) {
      console.error('Error fetching shoes data: ', e);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    fetchShoesData(selected);
  }, [selected]);

  return (
    <div className={responsiveBox}>
      <div className={container}>
        {toastMessage && <ToastMessage message={toastMessage} duration={3000} />}
        <Header title="신발장" customNavigate={() => navigate('/login')} />
        <UserProfile />
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
