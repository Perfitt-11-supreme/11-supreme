import { useEffect, useState } from 'react';
import Button from '../../common/button/Button';
import DateSelect from './signupdateselect/SignUpDateSelect';
import Header from '../../common/header/Header';
import Modal from '../../common/modal/Modal';
import Select from './signupselect/SignUpSelect';
import { hamburger_menu } from '../../../assets/assets';
import { fullContainer } from '../../login/login.css';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../signup.css';
import { useNavigate } from 'react-router-dom';
import { USER_COLLECTION } from '../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const GoogleSignUpPlus = () => {
  type FormErrors = {
    gender?: string;
    birthDate?: string;
    [key: string]: string | undefined;
  };

  type FormData = {
    gender: string;
    birthDate: {
      year: string;
      month: string;
      day: string;
    };
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    birthDate: {
      year: '',
      month: '',
      day: '',
    },
  });

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
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

  const navigate = useNavigate();
  //localStorage에서 사용자 ID 가져오기
  const userUID = localStorage.getItem('userUID');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (userUID) {
          //USER Collection에 데이터 저장
          const userDocRef = doc(USER_COLLECTION, userUID); //사용자 ID로 문서 참조
          await updateDoc(userDocRef, {
            gender: formData.gender,
            birthDate: formData.birthDate,
          });

          navigate('/signupsize');
        } else {
          alert('처음부터 순서대로 회원가입을 진행해주세요.');
        }
      } catch {
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const [modalHeight, setModalHeight] = useState<string>('357px');

  useEffect(() => {
    const errorMessages = Object.values(errors).filter(Boolean);
    const additionalHeight = errorMessages.length * 20;
    setModalHeight(`${Math.max(357, 357 + additionalHeight)}px`);
  }, [errors]);

  return (
    <div className={fullContainer}>
      <div>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />
      </div>

      <div>
        <Modal title="회원가입" height={modalHeight} initialHeight="357px" animateHeightOnClick={false}>
          <div className={signupFormContainer}>
            <div>
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
        </Modal>
      </div>
    </div>
  );
};

export default GoogleSignUpPlus;
