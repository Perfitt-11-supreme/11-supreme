import { useState } from 'react';
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

const SignUpSizeInputValid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shoeSize, setShoeSize] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ sizeType?: string; shoeSize?: string }>({});

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  };

  return (
    <div className={fullContainer}>
      <div style={{ height: '34px' }}></div>

      <Header imageSrc={hamburger_menu} alt="hamburger menu" />

      <div style={{ display: 'flex', marginTop: 'auto' }}>
        <Modal title="회원가입" height="76px" />
      </div>

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
    </div>
  );
};

export default SignUpSizeInputValid;
