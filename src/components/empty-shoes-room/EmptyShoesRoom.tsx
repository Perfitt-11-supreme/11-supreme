import { noshoes } from '../../assets/assets';
import Button from '../common/button/Button';
import Header from './header/Header';
import UserProfile from './user-profile/UserProfile';
import { buttonDiv, container, noShoesDiv } from './emptyshoesroom.css';

const EmptyShoesRoom = () => {
  return (
    <div className={container}>
      <Header title="신발장" />
      <UserProfile />
      <div className={noShoesDiv}>
        <img src={noshoes} />
      </div>
      <div className={buttonDiv}>
        <Button text="신발 등록하기" />
      </div>
    </div>
  );
};
export default EmptyShoesRoom;
