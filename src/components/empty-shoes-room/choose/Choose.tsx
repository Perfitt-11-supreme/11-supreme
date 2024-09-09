import React from 'react';
import { radio, radioButton, radioChecked, radioform } from './choose.css';

type Option = {
  id: string;
  label: string;
};

type ChooseProps = {
  groupName: string;
  options: Option[];
  selectedOption: string;
  setter: (value: string) => void;
};

const Choose = ({ groupName, options, selectedOption, setter }: ChooseProps) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };
  return (
    <form className={radioform}>
      {options.map(option => (
        <div key={option.id}>
          <input
            className={radio}
            type="radio"
            id={option.id}
            name={groupName}
            value={option.label}
            onChange={handleChangeValue}
            checked={selectedOption === option.label}
          />
          <label
            className={`${radioButton} ${selectedOption === option.label ? radioChecked : ''}`}
            htmlFor={option.id}
          >
            {option.label}
          </label>
        </div>
      ))}
    </form>
  );
};

export default Choose;
