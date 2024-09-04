import { input, inputBox, inputLabel } from '../common/input/input.css';

type TInput = {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
}: TInput & { value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <>
      <div className={inputBox}>
        <label className={inputLabel} htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          className={input}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          // required
        />
      </div>
    </>
  );
};

export default Input;
