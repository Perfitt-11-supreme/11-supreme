import { user } from '../../../assets/assets';
import { descP, nameP, userButton, userDiv } from './userprofile.css';

type UserData = {
  userName?: string;
  shoeSize?: number;
  sizeType?: string;
};

type UserProfileProps = {
  userData: UserData | null; // userData는 UserData 타입이거나 null일 수 있음
};

const UserProfile = ({ userData }: UserProfileProps) => {
  return (
    <div className={userDiv}>
      <button className={userButton}>
        <img src={user} alt="User Profile" />
      </button>
      <div>
        <p className={nameP}>{userData?.userName || '이름 없음'}</p>
        <p className={descP}>
          평소 신는 사이즈 | {userData?.shoeSize} {userData?.sizeType}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
