import React, { useState } from 'react';
import { label, labels, slider, sliderContainer } from './slider.css';

const Slider = () => {
  const [value, setValue] = useState(0);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const labelPositions = ['-10', '-5', '정사이즈', '+5', '+10'];

  return (
    <div className={sliderContainer}>
      <input type="range" min="-2" max="2" value={value} className={slider} onChange={handleChangeValue} />
      <div className={labels}>
        {labelPositions.map((position, index) => (
          <div key={index} style={{ zIndex: '2' }}>
            <span className={label}>{position}</span>
            {/* <div className={dot} style={{ left: `${(index / (labelPositions.length - 1)) * 100}%` }} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
