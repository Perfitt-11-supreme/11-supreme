import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hamburger_menu } from '../../../assets/assets';
import { USER_COLLECTION } from '../../../firebase/firebase';
import { useChatCompletion } from '../../../hooks/useChatCompletionHook';
import useUserStore from '../../../stores/useUserStore';
import { responsiveBox } from '../../../styles/responsive.css';
import Button from '../../common/button/Button';
import Header from '../../common/header/Header';
import Modal from '../../common/modal/Modal';
import { fullContainer } from '../../login/login.css';
import ToastMessage from '../../toastmessage/toastMessage';
import {
  errorMessage,
  infosubmitContainer,
  signupComponentContainer,
  signupSizeTypeContainer,
  signupSizeTypeLabel,
} from '../signup.css';
import InfoBox from './infobox/InfoBox';
import ButtonBlank from './sizetypebutton/buttonblank/ButtonBlank';
import ButtonFill from './sizetypebutton/buttonfill/ButtonFill';
import UsualSizeSelect from './usualsizeselect/UsualSizeSelect';

const SignUpSizeInputValid = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUserStore();

  const sizeTypes = ['mm', 'EU', 'US'];
  const [shoeSize, setShoeSize] = useState<number | ''>('');
  const [errors, setErrors] = useState<{
    sizeType?: string;
    shoeSize?: string;
  }>({});
  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { handleNewChat } = useChatCompletion();
  const validate = () => {
    const newErrors: { sizeType?: string; shoeSize?: string } = {};
    if (selectedIndex === null) newErrors.sizeType = '사이즈 타입을 선택해 주세요.';
    if (!shoeSize || isNaN(shoeSize)) newErrors.shoeSize = '평소 신는 스니커즈 사이즈를 선택해 주세요.';
    return newErrors;
  };

  const handleTypeSelect = (index: number) => {
    const newSelectedIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newSelectedIndex);
  };

  const handleSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? Number(event.target.value) : '';
    setShoeSize(value);
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        //zustand에 사용자 정보 업데이트
        const realUser = {
          ...user,
          shoeSize: shoeSize || undefined,
          sizeType: sizeTypes[selectedIndex || 0],
        };
        setUser(realUser);

        //Firestore에 uid를 ID로 사용자 등록
        const userDoc = doc(USER_COLLECTION, realUser.uid);
        await setDoc(userDoc, {
          email: realUser.email,
          userName: realUser.userName,
          gender: realUser.gender,
          birthDate: realUser.birthDate,
          shoeSize: realUser.shoeSize,
          sizeType: realUser.sizeType,
          uid: realUser.uid,
        });
        const newChatId = await handleNewChat();
        navigate(`/hello/${newChatId}`, { replace: true });
        // navigate('/chatbot');
      } catch (error) {
        console.error('사용자 등록 실패:', error);
        setToastMessage({ message: '다시 시도해 주세요.', duration: 3000 });
      }
    }
  };

  const [modalHeight, setModalHeight] = useState<string>('492px');

  useEffect(() => {
    const errorMessages = Object.values(errors).filter(Boolean);
    const additionalHeight = errorMessages.length * 20;
    setModalHeight(`${Math.max(492, 492 + additionalHeight)}px`);

    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }
  }, [errors, toastMessage]);

  return (
    <div className={responsiveBox}>
      <div className={fullContainer}>
        {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
        <div>
          <Header imageSrc={hamburger_menu} alt="hamburger menu" />
        </div>

        <div>
          <Modal title="회원가입" height={modalHeight} initialHeight="492px" animateHeightOnClick={false}>
            <div className={signupComponentContainer}>
              <div className={signupSizeTypeContainer}>
                <label className={signupSizeTypeLabel}>사이즈 타입</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {sizeTypes.map((sizeType, index) =>
                    selectedIndex === index ? (
                      <ButtonFill key={index} text={sizeType} onClick={() => handleTypeSelect(index)} />
                    ) : (
                      <ButtonBlank key={index} text={sizeType} onClick={() => handleTypeSelect(index)} />
                    )
                  )}
                </div>
                {errors.sizeType && <div className={errorMessage}>{errors.sizeType}</div>}
              </div>
            </div>

            <div className={signupComponentContainer} style={{ marginTop: '24px' }}>
              <UsualSizeSelect label="평소 신는 스니커즈 사이즈" value={shoeSize} onChange={handleSizeSelect} />
            </div>
            {errors.shoeSize && (
              <div className={errorMessage} style={{ marginLeft: '16px' }}>
                {errors.shoeSize}
              </div>
            )}

            <div className={infosubmitContainer}>
              <InfoBox />
              <Button text="가입 완료" onClick={handleSubmit} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SignUpSizeInputValid;
