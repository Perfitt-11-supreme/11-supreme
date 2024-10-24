import { usualsizeLabel, usualsizeSelect, usualsizeSelectBox } from './usualsizeSelect.css';

type TUsualSizeSelect = {
  label: string;
  value: number | '';
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const UsualSizeSelect = ({ label, value, onChange }: TUsualSizeSelect) => {
  const setSizeOptions = (start: number, end: number, step: number) => {
    const options = [];
    for (let i = start; i <= end; i += step) {
      options.push(i);
    }
    return options;
  };

  const sizeOptions = setSizeOptions(210, 290, 5);

  return (
    <div className={usualsizeSelectBox}>
      <label htmlFor="usualsize" className={usualsizeLabel}>
        {label}
      </label>
      <select id="usualsize" className={usualsizeSelect} value={value} onChange={onChange}>
        <option value="">사이즈를 선택해 주세요</option>
        {sizeOptions.map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UsualSizeSelect;
