import { useState } from 'react';
import { hamburger_menu } from '../assets/assets.css';
import Button from './common/button/Button';
import ButtonBlank from './buttonselect/ButtonBlank';
import ButtonFill from './buttonselect/ButtonFill';
import Header from './common/header/Header';
import Modal from './common/modal/Modal';
import UsualSizeSelect from './usualsizeselect/UsualSizeSelect';
import InfoBox from './infobox/InfoBox';
import { theme } from '../styles/theme';

const SignUpSizeInputValid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shoeSize, setShoeSize] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ sizeType?: string; shoeSize?: string }>({});

  const sizeTypes = ['mm', 'EU', 'US'];

  const validate = (): { sizeType?: string; shoeSize?: string } => {
    const newErrors: { sizeType?: string; shoeSize?: string } = {};

    if (selectedIndex === null) {
      newErrors.sizeType = '사이즈 타입을 선택해 주세요.';
    }
    if (shoeSize === '' || isNaN(shoeSize)) {
      newErrors.shoeSize = '평소 신는 스니커즈 사이즈를 선택해 주세요.';
    }

    return newErrors;
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(indexNow => (indexNow === index ? null : index));
  };

  const handleShoeSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setShoeSize(value === '' ? '' : Number(value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('성공~~~...');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '375px',
        height: '812px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ height: '34px' }}></div>

      <Header imageSrc={hamburger_menu} alt="hamburger menu" />

      <div style={{ display: 'flex', marginTop: 'auto' }}>
        <Modal title="회원가입" height="76px" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label
            htmlFor="sizeTypes"
            style={{
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '17px',
              letterSpacing: '-0.003em',
              userSelect: 'none',
            }}
          >
            사이즈 타입
          </label>

          <div style={{ display: 'flex', gap: '8px' }}>
            {sizeTypes.map((text, index) =>
              selectedIndex === index ? (
                <ButtonFill key={index} text={text} onClick={() => handleSelect(index)} />
              ) : (
                <ButtonBlank key={index} text={text} onClick={() => handleSelect(index)} />
              )
            )}
          </div>
        </div>
      </div>
      {errors.sizeType && (
        <div
          style={{
            color: theme.color.red800,
            fontSize: '12px',
            fontWeight: '400',
            marginTop: '8px',
            marginLeft: '16px',
          }}
        >
          {errors.sizeType}
        </div>
      )}

      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <UsualSizeSelect label="평소 신는 스니커즈 사이즈" value={shoeSize} onChange={handleShoeSizeChange} />
      </div>
      {errors.shoeSize && (
        <div
          style={{
            color: theme.color.red800,
            fontSize: '12px',
            fontWeight: '400',
            marginTop: '8px',
            marginLeft: '16px',
          }}
        >
          {errors.shoeSize}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          marginTop: '24px',
          marginBottom: '34px',
        }}
      >
        <InfoBox />
        <form onSubmit={handleSubmit}>
          <Button text="가입 완료" />
        </form>
      </div>
    </div>
  );
};

export default SignUpSizeInputValid;
