import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase/firebase';
import { responsiveBox } from '../../../../styles/responsive.css';
import { foundResultStyle, fullContainer } from '../../../login/login.css';
import { back_arrow } from '../../../../assets/assets';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../../signup/signup.css';
import SignUpInput from '../../../signup/infoInput/signupinput/SignUpInput';
import Button from '../../../common/button/Button';
import Header from '../../../common/header/Header';
import useUserStore from '../../../../stores/useUserStore';
import SignUpSelect from '../../../signup/infoInput/signupselect/SignUpSelect';
import SignUpDateSelect from '../../../signup/infoInput/signupdateselect/SignUpDateSelect';
import UsualSizeSelect from '../../../signup/sizeinput/usualsizeselect/UsualSizeSelect';
import ButtonFill from '../../../signup/sizeinput/sizetypebutton/buttonfill/ButtonFill';
import ButtonBlank from '../../../signup/sizeinput/sizetypebutton/buttonblank/ButtonBlank';
import { editSizeContainer, editSizeTypeContainer, editSizeTypeLabel } from './editUser.css';

const EditUser = () => {
  type FormErrors = {
    userName?: string;
    gender?: string;
    birthDate?: string;
    shoeSize?: string;
    sizeType?: string;
  };

  type FormData = {
    userName: string;
    gender: string;
    birthDate: {
      year: string;
      month: string;
      day: string;
    };
    shoeSize: number | '';
    sizeType: string;
  };

  const navigate = useNavigate();
  const { user } = useUserStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    userName: user?.userName || '',
    gender: user?.gender || '',
    birthDate: user?.birthDate || { year: '', month: '', day: '' },
    shoeSize: user?.shoeSize || '',
    sizeType: user?.sizeType || '',
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const sizeTypes = ['mm', 'EU', 'US'];

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.userName) {
      newErrors.userName = '이름을 입력해 주세요';
    }
    if (!data.gender) {
      newErrors.gender = '성별을 선택해 주세요';
    }
    if (!data.birthDate.year || !data.birthDate.month || !data.birthDate.day) {
      newErrors.birthDate = '생년월일을 선택해 주세요';
    }
    if (!data.sizeType) {
      newErrors.sizeType = '사이즈 타입을 선택해 주세요';
    }
    if (!data.shoeSize) {
      newErrors.shoeSize = '신발 사이즈를 선택해 주세요';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBirthDateChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      birthDate: {
        ...prev.birthDate,
        [field]: value,
      },
    }));
  };

  const handleTypeSelect = (index: number) => {
    setSelectedIndex(index);
    setFormData(prev => ({
      ...prev,
      sizeType: sizeTypes[index],
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : '';
    setFormData(prev => ({
      ...prev,
      shoeSize: value,
    }));
  };

  const handleSubmit = async () => {
    setErrors({});

    const errors = validate(formData);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    try {
      if (user?.uid) {
        const userDocRef = doc(db, 'users', user.uid);

        // Firestore에 사용자 정보 업데이트
        await updateDoc(userDocRef, {
          userName: formData.userName,
          gender: formData.gender,
          birthDate: formData.birthDate,
          shoeSize: formData.shoeSize,
          sizeType: formData.sizeType,
        });

        setSuccessMessage('사용자 정보가 성공적으로 업데이트되었습니다.');
        setError('');
        setTimeout(async () => {
          navigate('/my', { replace: true });
        }, 1000);
      }
    } catch (error) {
      setError('정보 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
      setSuccessMessage(null);
      console.error(error);
    }
  };

  return (
    <>
      <div className={responsiveBox} style={{ overflow: 'hidden' }}>
        <div className={fullContainer}>
          <div>
            <Header imageSrc={back_arrow} alt="back arrow" title="내 정보 수정" />
            <div className={signupFormContainer} style={{ marginTop: '20px' }}>
              <div>
                <SignUpInput
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
                <SignUpSelect
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
                <SignUpDateSelect label="생년월일" value={formData.birthDate} onChange={handleBirthDateChange} />
                {errors.birthDate && <div className={errorMessage}>{errors.birthDate}</div>}
              </div>

              {/* 사이즈 정보 변경 */}
              <div className={editSizeContainer}>
                <div className={editSizeTypeContainer}>
                  <label className={editSizeTypeLabel}>사이즈 타입</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {sizeTypes.map((sizeType, index) =>
                      selectedIndex === index ? (
                        <ButtonFill key={index} text={sizeType} onClick={() => handleTypeSelect(index)} />
                      ) : (
                        <ButtonBlank key={index} text={sizeType} onClick={() => handleTypeSelect(index)} />
                      )
                    )}
                  </div>
                  {errors.sizeType && <div className={errorMessage}>{errors.sizeType}</div>}
                </div>
              </div>

              <div className={editSizeContainer}>
                <UsualSizeSelect
                  label="평소 신는 스니커즈 사이즈"
                  value={formData.shoeSize}
                  onChange={handleSizeChange}
                />
              </div>
              {errors.shoeSize && <div className={errorMessage}>{errors.shoeSize}</div>}

              <div className={submitbuttonContainer}>
                <Button type="button" text="정보 수정" width="100%" onClick={handleSubmit} />
              </div>

              {successMessage && <div className={foundResultStyle}>{successMessage}</div>}
              {error && <div className={foundResultStyle}>{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
