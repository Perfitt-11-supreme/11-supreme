import { user } from '../../assets/assets.css';
import { descP, nameP, userButton, userDiv } from './userprofile.css';

const UserProfile = () => {
  return (
    <>
      <div className={userDiv}>
        <button className={userButton}>
          <img src={user} />
        </button>
        <div>
          <p className={nameP}>임성민</p>
          <p className={descP}>평소 신는 사이즈 | 270mm</p>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
