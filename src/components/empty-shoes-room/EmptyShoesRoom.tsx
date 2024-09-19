// EmptyShoesRoom.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const EmptyShoesRoom = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [shoesList, setShoesList] = useState<any[]>([]);
  const [selected, setSelected] = useState('latest');
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
      const shoes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(shoes);
      setShoesList(shoes);
      setIsTrue(shoes.length > 0);
    } catch (e) {
      console.error('Error fetching shoes data: ', e);
    }
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    fetchShoesData(selected);
  }, [selected]);

  return (
    <div className={responsiveBox}>
      <div className={container}>
        <Header title="신발장" />
        <UserProfile />
        {isTrue ? (
          <>
            <div className={optiondiv}>
              <p className={countp}>
                <span className={fontBold}>총 {shoesList.length}</span>개
              </p>
              <select className={select} value={selected} onChange={handleOrderChange}>
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
                  <img className={buttonImage} src={shoe.imageUrl} alt={shoe.name} />
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
