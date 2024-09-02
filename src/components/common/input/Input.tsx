import { input, inputBox, inputLabel } from './input.css';

type TInput = {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
};

const Input = ({ label, type, name, id, placeholder }: TInput) => {
  return (
    <>
      <div className={inputBox}>
        <label className={inputLabel} htmlFor={id}>
          {label}
        </label>
        <input type={type} className={input} name={name} id={id} placeholder={placeholder} required />
      </div>
    </>
  );
};

export default Input;
