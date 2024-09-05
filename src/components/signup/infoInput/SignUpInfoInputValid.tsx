import { useState } from 'react';
import Button from '../../common/button/Button';
import DateSelect from './signupdateselect/SignUpDateSelect';
import Header from '../../common/header/Header';
import Input from './signupinput/SignUpInput';
import Modal from '../../common/modal/Modal';
import Select from './signupselect/SignUpSelect';
import { hamburger_menu } from '../../../assets/assets';
import { batteryMargin, fullContainer } from '../../login/login.css';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../signup.css';

const SignUpInfoInputValid = () => {
  type FormErrors = {
    userEmail?: string;
    userPassword?: string;
    userName?: string;
    gender?: string;
    birthDate?: string;
    [key: string]: string | undefined;
  };

  type FormData = {
    userEmail: string;
    userPassword: string;
    userName: string;
    gender: string;
    birthDate: {
      year: string;
      month: string;
      day: string;
    };
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    userEmail: '',
    userPassword: '',
    userName: '',
    gender: '',
    birthDate: {
      year: '',
      month: '',
      day: '',
    },
  });

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.userEmail) {
      newErrors.userEmail = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(data.userEmail)) {
      newErrors.userEmail = '유효한 형식의 이메일을 입력해주세요';
    }
    if (!data.userPassword) newErrors.userPassword = '비밀번호를 입력해주세요';
    if (!data.userName) newErrors.userName = '이름을 입력해주세요';
    if (!data.gender) newErrors.gender = '성별을 선택해주세요';
    const { year, month, day } = data.birthDate;
    if (!year || !month || !day) newErrors.birthDate = '생년월일을 입력해주세요';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'year' || name === 'month' || name === 'day') {
      setFormData(prev => ({
        ...prev,
        birthDate: {
          ...prev.birthDate,
          [name]: value,
        },
      }));

      const updatedErrors = validate({
        ...formData,
        birthDate: {
          ...formData.birthDate,
          [name]: value,
        },
      });
      setErrors(prev => ({
        ...prev,
        birthDate: updatedErrors.birthDate,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));

      const updatedErrors = validate({
        ...formData,
        [name]: value,
      });
      setErrors(prev => ({
        ...prev,
        [name]: updatedErrors[name],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  return (
    <div className={fullContainer}>
      <div className={batteryMargin}></div>

      <Header imageSrc={hamburger_menu} alt="hamburger menu" />

      <div style={{ display: 'flex', marginTop: 'auto' }}>
        <Modal title="회원가입" height="76px" />
      </div>

      <div className={signupFormContainer}>
        <div>
          <Input
            label="아이디"
            type="email"
            name="userEmail"
            id="userEmail1"
            placeholder="이메일을 입력해주세요"
            value={formData.userEmail}
            onChange={handleChange}
          />
          {errors.userEmail && <div className={errorMessage}>{errors.userEmail}</div>}
        </div>

        <div className={signupFormGap}>
          <Input
            label="비밀번호"
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="비밀번호를 입력해주세요"
            value={formData.userPassword}
            onChange={handleChange}
          />
          {errors.userPassword && <div className={errorMessage}>{errors.userPassword}</div>}
        </div>

        <div className={signupFormGap}>
          <Input
            label="이름"
            type="text"
            name="userName"
            id="userName"
            placeholder="이름을 입력해 주세요"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && <div className={errorMessage}>{errors.userName}</div>}
        </div>

        <div className={signupFormGap}>
          <Select
            id="gender"
            label="성별"
            options={[
              { value: '', label: '성별을 선택해 주세요' },
              { value: 'male', label: '남성' },
              { value: 'female', label: '여성' },
            ]}
            value={formData.gender}
            onChange={handleChange}
          />
          {errors.gender && <div className={errorMessage}>{errors.gender}</div>}
        </div>

        <div className={signupFormGap}>
          <DateSelect
            label="생년월일"
            value={{
              year: formData.birthDate.year,
              month: formData.birthDate.month,
              day: formData.birthDate.day,
            }}
            onChange={handleChange}
          />
          {errors.birthDate && <div className={errorMessage}>{errors.birthDate}</div>}
        </div>

        <div className={submitbuttonContainer}>
          <form onSubmit={handleSubmit}>
            <Button text="다음" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpInfoInputValid;
