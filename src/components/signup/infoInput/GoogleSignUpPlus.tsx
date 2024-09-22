import { useEffect, useState } from 'react';
import Button from '../../common/button/Button';
import DateSelect from './signupdateselect/SignUpDateSelect';
import Header from '../../common/header/Header';
import Modal from '../../common/modal/Modal';
import Select from './signupselect/SignUpSelect';
import { hamburger_menu } from '../../../assets/assets';
import { fullContainer } from '../../login/login.css';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../signup.css';
import { useNavigate } from 'react-router-dom';
import { responsiveBox } from '../../../styles/responsive.css';
import ToastMessage from '../../toastmessage/toastMessage';
import useUserStore from '../../../stores/useUserStore';

const GoogleSignUpPlus = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUserStore();

  const [birthDate, setBirthDate] = useState({ year: '', month: '', day: '' });
  const [gender, setGender] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!birthDate.year || !birthDate.month || !birthDate.day) newErrors.birthDate = '생년월일을 입력해 주세요';
    if (!gender) newErrors.gender = '성별을 선택해 주세요';
    return newErrors;
  };

  const handleNextPage = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        //zustand에 사용자 정보 업데이트
        const updatedGoogleUser = {
          ...user,
          birthDate: {
            year: birthDate.year,
            month: birthDate.month,
            day: birthDate.day,
          },
          gender: gender,
        };
        setUser(updatedGoogleUser);

        navigate('/signupsize');
      } catch (error) {
        console.error('상태 업데이트 실패:', error);
        setToastMessage({ message: '다시 시도해 주세요.', duration: 3000 });
      }
    }
  };

  const [modalHeight, setModalHeight] = useState<string>('357px');

  useEffect(() => {
    const errorMessages = Object.values(errors).filter(Boolean);
    const additionalHeight = errorMessages.length * 20;
    setModalHeight(`${Math.max(357, 357 + additionalHeight)}px`);

    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }
  }, [errors, toastMessage]);

  return (
    <>
      <div className={responsiveBox}>
        <div className={fullContainer}>
          {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
          <div>
            <Header imageSrc={hamburger_menu} alt="hamburger menu" />
          </div>

          <div>
            <Modal title="회원가입" height={modalHeight} initialHeight="357px" animateHeightOnClick={false}>
              <div className={signupFormContainer}>
                <div>
                  <Select
                    id="gender"
                    label="성별"
                    options={[
                      { value: '', label: '성별을 선택해 주세요' },
                      { value: 'male', label: '남성' },
                      { value: 'female', label: '여성' },
                    ]}
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                  />
                  {errors.gender && <div className={errorMessage}>{errors.gender}</div>}
                </div>

                <div className={signupFormGap}>
                  <DateSelect
                    label="생년월일"
                    value={{
                      year: birthDate.year,
                      month: birthDate.month,
                      day: birthDate.day,
                    }}
                    onChange={(field, value) => setBirthDate(prev => ({ ...prev, [field]: value }))}
                  />
                  {errors.birthDate && <div className={errorMessage}>{errors.birthDate}</div>}
                </div>

                <div className={submitbuttonContainer}>
                  <Button text="다음" onClick={handleNextPage} />
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleSignUpPlus;
