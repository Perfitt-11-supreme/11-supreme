import { sliderContainer, slider, track, dotContainer, dot, labels, label, visuallyHidden } from './slider.css';
import { useShoesRegistryStore } from '../../stores/useRegistryStore';
import React, { useEffect, useState } from 'react';

// 슬라이더 값과 라벨 매핑
const valueToLabel: Record<string, string> = {
  '-2': '많이 작아요',
  '-1': '약간 작아요',
  '0': '정사이즈',
  '1': '약간 커요',
  '2': '많이 커요',
};

const Slider = () => {
  const { setRecommendation } = useShoesRegistryStore();
  const [value, setValue] = useState('0');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setRecommendation(valueToLabel[newValue]);
  };

  useEffect(() => {
    setRecommendation(valueToLabel[value]);
  }, [value]);

  const labelPositions = Object.keys(valueToLabel)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(key => valueToLabel[key]);

  return (
    <div className={sliderContainer}>
      <div className={track} />
      <label htmlFor="slider" className={visuallyHidden}>
        추천 사이즈
      </label>
      <input id="slider" type="range" min="-2" max="2" value={value} className={slider} onChange={handleChangeValue} />
      <div className={dotContainer}>
        {labelPositions.map(key => (
          <div key={key} className={dot} />
        ))}
      </div>
      <div className={labels}>
        {labelPositions.map((position, index) => (
          <div key={index}>
            <span className={label}>{position}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Slider);
