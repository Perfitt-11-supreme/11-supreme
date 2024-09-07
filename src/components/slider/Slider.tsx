import React, { useState } from 'react';
import { label, labels, slider, sliderContainer } from './slider.css';

interface SliderProps {
  onChange?: (value: number) => void;
}

const Slider = ({ onChange }: SliderProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const labelPositions = ['많이 작아요', '약간 작아요', '정사이즈', '약간 커요', '많이 커요'];

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
