import { useEffect, useState } from 'react';
import Button from '../../common/button/Button';
import ButtonBlank from './sizetypebutton/buttonblank/ButtonBlank';
import ButtonFill from './sizetypebutton/buttonfill/ButtonFill';
import Header from '../../common/header/Header';
import Modal from '../../common/modal/Modal';
import UsualSizeSelect from './usualsizeselect/UsualSizeSelect';
import InfoBox from './infobox/InfoBox';
import { hamburger_menu } from '../../../assets/assets';
import { fullContainer } from '../../login/login.css';
import {
  errorMessage,
  infosubmitContainer,
  signupComponentContainer,
  signupSizeTypeContainer,
  signupSizeTypeLabel,
} from '../signup.css';
import { USER_COLLECTION } from '../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUpSizeInputValid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shoeSize, setShoeSize] = useState<number | ''>('');
  const [errors, setErrors] = useState<{
    sizeType?: string;
    shoeSize?: string;
  }>({});

  const sizeTypes = ['mm', 'EU', 'US'];

  const validate = () => {
    const newErrors: { sizeType?: string; shoeSize?: string } = {};
    if (selectedIndex === null) newErrors.sizeType = '사이즈 타입을 선택해 주세요.';
    if (!shoeSize || isNaN(shoeSize)) newErrors.shoeSize = '평소 신는 스니커즈 사이즈를 선택해 주세요.';
    return newErrors;
  };

  const handleSelect = (index: number) => {
    const newSelectedIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newSelectedIndex);

    setErrors(prev => ({
      ...prev,
      sizeType: newSelectedIndex === null ? '사이즈 타입을 선택해 주세요.' : '',
    }));
  };

  const handleShoeSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? Number(event.target.value) : '';
    setShoeSize(value);

    setErrors(prev => ({
      ...prev,
      shoeSize: !value || isNaN(value) ? '평소 신는 스니커즈 사이즈를 선택해 주세요.' : '',
    }));
  };

  const navigate = useNavigate();
  //localStorage에서 사용자 ID 가져오기
  const userUID = localStorage.getItem('userUID');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (userUID) {
          //USER Collection에 데이터 저장
          const userDocRef = doc(USER_COLLECTION, userUID); //사용자 ID로 문서 참조
          await updateDoc(userDocRef, {
            sizeType: sizeTypes[selectedIndex || 0],
            shoeSize: shoeSize,
          });

          // 저장 성공
          navigate('/login');
        } else {
          alert('처음부터 순서대로 회원가입을 진행해주세요.');
        }
      } catch {
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const [modalHeight, setModalHeight] = useState<string>('492px');

  useEffect(() => {
    const errorMessages = Object.values(errors).filter(Boolean);
    const additionalHeight = errorMessages.length * 20;
    setModalHeight(`${Math.max(492, 492 + additionalHeight)}px`);
  }, [errors]);

  return (
    <div className={fullContainer}>
      <div>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />
      </div>

      <div>
        <Modal title="회원가입" height={modalHeight} initialHeight="492px" animateHeightOnClick={false}>
          <div className={signupComponentContainer}>
            <div className={signupSizeTypeContainer}>
              <label className={signupSizeTypeLabel}>사이즈 타입</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {sizeTypes.map((text, index) =>
                  selectedIndex === index ? (
                    <ButtonFill key={index} text={text} onClick={() => handleSelect(index)} />
                  ) : (
                    <ButtonBlank key={index} text={text} onClick={() => handleSelect(index)} />
                  )
                )}
              </div>
              {errors.sizeType && <div className={errorMessage}>{errors.sizeType}</div>}
            </div>
          </div>

          <div className={signupComponentContainer} style={{ marginTop: '24px' }}>
            <UsualSizeSelect label="평소 신는 스니커즈 사이즈" value={shoeSize} onChange={handleShoeSizeChange} />
          </div>
          {errors.shoeSize && (
            <div className={errorMessage} style={{ marginLeft: '16px' }}>
              {errors.shoeSize}
            </div>
          )}

          <div className={infosubmitContainer}>
            <InfoBox />
            <form onSubmit={handleSubmit}>
              <Button text="가입 완료" />
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SignUpSizeInputValid;
