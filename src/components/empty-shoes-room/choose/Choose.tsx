import { radio, radioButton, radioChecked, radioform } from './choose.css';

const Choose = ({
  groupName,
  options,
  selectedOption,
  handleChange,
}: {
  groupName: string;
  options: { id: string; label: string }[];
  selectedOption: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form className={radioform}>
      {options.map(option => (
        <>
          <input
            className={radio}
            type="radio"
            id={option.id}
            name={groupName}
            value={option.id}
            onChange={handleChange}
            checked={selectedOption === option.id}
          />
          <label className={`${radioButton} ${selectedOption === option.id ? radioChecked : ''}`} htmlFor={option.id}>
            {option.label}
          </label>
        </>
      ))}
    </form>
  );
};

export default Choose;
