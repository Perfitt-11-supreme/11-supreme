import { useState } from 'react';

import Button from './common/button/Button';
import ButtonBlank from './buttonselect/ButtonBlank';
import ButtonFill from './buttonselect/ButtonFill';
import Header from './common/header/Header';
import Modal from './common/modal/Modal';
import UsualSizeSelect from './usualsizeselect/UsualSizeSelect';
import InfoBox from './infobox/InfoBox';
import { hamburger_menu } from '../assets/assets';

const SignUpSizeInput = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sizeTypes = ['mm', 'EU', 'US'];
  const handleSelect = (index: number) => {
    setSelectedIndex(indexNow => (indexNow === index ? null : index));
  };

  return (
    <>
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
        <div
          style={{
            height: '34px',
          }}
        ></div>

        <Header imageSrc={hamburger_menu} alt="hamburger menu" />

        <div style={{ display: 'flex', marginTop: 'auto' }}>
          <Modal title="회원가입" height="76px" />
        </div>

        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
          }}
        >
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

          <UsualSizeSelect label="평소 신는 스니커즈 사이즈" value="" onChange={() => {}} />
        </form>

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

          <Button text="가입 완료" />
        </div>
      </div>
    </>
  );
};

export default SignUpSizeInput;
