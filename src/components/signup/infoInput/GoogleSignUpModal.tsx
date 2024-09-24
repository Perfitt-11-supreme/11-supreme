import { useEffect, useState } from 'react';
import Button from '../../common/button/Button';
import DateSelect from './signupdateselect/SignUpDateSelect';
import Modal from '../../common/modal/Modal';
import Select from './signupselect/SignUpSelect';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../signup.css';
import ToastMessage from '../../toastmessage/toastMessage';
import useUserStore from '../../../stores/useUserStore';

type GoogleSignUpModalProps = {
  isOpen: boolean; //부모로부터 전달받은 isModalOpen 상태
  onNext: () => void;
};

const GoogleSignUpModal: React.FC<GoogleSignUpModalProps> = ({ isOpen, onNext }) => {
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

        onNext();
      } catch (error) {
        console.error('상태 업데이트 실패:', error);
        setToastMessage({ message: '다시 시도해 주세요.', duration: 3000 });
      }
    }
  };

  const [modalHeight, setModalHeight] = useState<string>('0px'); //초기 높이를 0으로 설정
  const [isAnimating, setIsAnimating] = useState(false); //애니메이션 상태 관리

  useEffect(() => {
    const errorMessages = Object.values(errors).filter(Boolean);
    const additionalHeight = errorMessages.length * 20;
    setModalHeight(`${Math.max(357, 357 + additionalHeight)}px`);

    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }

    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500); //애니메이션 종료 후 상태 변경
      return () => clearTimeout(timer);
    }
  }, [errors, toastMessage, isAnimating]);

  //isOpen 상태에 따라 모달의 높이와 애니메이션 조절
  useEffect(() => {
    if (isOpen) {
      setModalHeight('357px'); //모달이 열리면 높이를 612px로 설정
      setIsAnimating(true);
    } else {
      setModalHeight('0px'); //모달이 닫히면 높이를 0px으로 설정
      setIsAnimating(true);
    }
  }, [isOpen]);

  return (
    <>
      <div>
        {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
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
              <Button text="다음" width="100%" onClick={handleNextPage} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default GoogleSignUpModal;
