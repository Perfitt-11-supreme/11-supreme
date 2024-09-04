import { select, selectBox, selectLabel } from '../common/select/select.css';

type TOption = {
  value: string;
  label: string;
};
type TSelect = {
  id: string;
  label: string;
  options: TOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ id, label, options, value, onChange }: TSelect) => {
  return (
    <>
      <div className={selectBox}>
        <label htmlFor={id} className={selectLabel}>
          {label}
        </label>
        <select id={id} className={select} name={id} value={value} onChange={onChange}>
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
