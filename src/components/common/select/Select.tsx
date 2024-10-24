import { select, selectBox, selectLabel } from './select.css';

type TOption = {
  value: string;
  label: string;
};
type TSelect = {
  id: string;
  label: string;
  options: TOption[];
};

const Select = ({ id, label, options }: TSelect) => {
  return (
    <>
      <div className={selectBox}>
        <label htmlFor={id} className={selectLabel}>
          {label}
        </label>
        <select id={id} className={select}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
