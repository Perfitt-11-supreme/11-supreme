import { useState } from 'react';
import { hamburger_menu } from '../assets/assets.css';
import Button from './common/button/Button';
import DateSelect from './logindateselect/LoginDateSelect';
import Header from './common/header/Header';
import Input from './logininput/LoginInput';
import Modal from './common/modal/Modal';
import Select from './loginselect/LoginSelect';
import { theme } from '../styles/theme';

const SignUpInfoInputValid = () => {
  type FormErrors = {
    userEmail?: string;
    userPassword?: string;
    userName?: string;
    gender?: string;
    birthDate?: string;
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

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.userEmail) {
      newErrors.userEmail = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
      newErrors.userEmail = '유효한 형식의 이메일을 입력해주세요'; //안 됨.........
    }
    if (!formData.userPassword) newErrors.userPassword = '비밀번호를 입력해주세요';
    if (!formData.userName) newErrors.userName = '이름을 입력해주세요';
    if (!formData.gender) newErrors.gender = '성별을 선택해주세요';
    const { year, month, day } = formData.birthDate;
    if (!year || !month || !day) newErrors.birthDate = '생년월일을 입력해주세요';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('성공~~~... 여기 뭐해야 하지');
    }
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
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '375px',
        height: '812px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          height: '34px',
        }}
      ></div>

      <Header imageSrc={hamburger_menu} alt="hamburger menu" />

      <div style={{ display: 'flex', marginTop: 'auto' }}>
        <Modal title="회원가입" height="76px" />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          // overflowY: 'auto'
        }}
      >
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
          {errors.userEmail && (
            <div
              style={{
                color: theme.color.red800,
                fontSize: '12px',
                fontWeight: '400',
                marginTop: '8px',
              }}
            >
              {errors.userEmail}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '16px',
          }}
        >
          <Input
            label="비밀번호"
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="비밀번호를 입력해주세요"
            value={formData.userPassword}
            onChange={handleChange}
          />
          {errors.userPassword && (
            <div
              style={{
                color: theme.color.red800,
                fontSize: '12px',
                fontWeight: '400',
                marginTop: '8px',
              }}
            >
              {errors.userPassword}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '16px',
          }}
        >
          <Input
            label="이름"
            type="text"
            name="userName"
            id="userName"
            placeholder="이름을 입력해 주세요"
            value={formData.userName}
            onChange={handleChange}
          />
          {errors.userName && (
            <div
              style={{
                color: theme.color.red800,
                fontSize: '12px',
                fontWeight: '400',
                marginTop: '8px',
              }}
            >
              {errors.userName}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '16px',
          }}
        >
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
          {errors.gender && (
            <div
              style={{
                color: theme.color.red800,
                fontSize: '12px',
                fontWeight: '400',
                marginTop: '8px',
              }}
            >
              {errors.gender}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '16px',
          }}
        >
          <DateSelect
            label="생년월일"
            value={{
              year: formData.birthDate.year,
              month: formData.birthDate.month,
              day: formData.birthDate.day,
            }}
            onChange={handleChange}
          />
          {errors.birthDate && (
            <div
              style={{
                color: theme.color.red800,
                fontSize: '12px',
                fontWeight: '400',
                marginTop: '8px',
              }}
            >
              {errors.birthDate}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '4px',
            marginTop: '40px',
            marginBottom: '34px',
            justifyContent: 'center',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Button text="다음" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpInfoInputValid;
