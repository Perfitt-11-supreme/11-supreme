import { getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { back_arrow } from '../../../assets/assets';
import { USER_COLLECTION } from '../../../firebase/firebase';
import { responsiveBox } from '../../../styles/responsive.css';
import Button from '../../common/button/Button';
import Header from '../../common/header/Header';
import SignUpDateSelect from '../../signup/infoInput/signupdateselect/SignUpDateSelect';
import SignUpInput from '../../signup/infoInput/signupinput/SignUpInput';
import SignUpSelect from '../../signup/infoInput/signupselect/SignUpSelect';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../signup/signup.css';
import { accountFindBox, accountFindButton } from '../emaillogin/emailLogin.css';
import { foundResultStyle, fullContainer } from '../login.css';

const FindEmail = () => {
  type FormErrors = {
    userName?: string;
    gender?: string;
    birthDate?: string;
    [key: string]: string | undefined;
  };

  type FormData = {
    userName: string;
    gender: string;
    birthDate: {
      year: string;
      month: string;
      day: string;
    };
  };

  const navigate = useNavigate();

  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
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
    if (!data.userName) newErrors.userName = '이름을 입력해 주세요';
    if (!data.gender) newErrors.gender = '성별을 선택해 주세요';
    const { year, month, day } = data.birthDate;
    if (!year || !month || !day) newErrors.birthDate = '생년월일을 입력해 주세요';
    return newErrors;
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'year' || field === 'month' || field === 'day') {
      setFormData(prev => ({
        ...prev,
        birthDate: {
          ...prev.birthDate,
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const [foundEmail, setFoundEmail] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleFindEmail = async () => {
    setErrors({});

    const errors = validate(formData);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    try {
      //일치하는 사용자 정보 찾기
      const userQuery = query(
        USER_COLLECTION,
        where('userName', '==', formData.userName),
        where('gender', '==', formData.gender),
        where('birthDate.year', '==', formData.birthDate.year),
        where('birthDate.month', '==', formData.birthDate.month),
        where('birthDate.day', '==', formData.birthDate.day)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setFoundEmail(data.email); //사용자의 이메일 출력
        setError(''); //일치하는 사용자 정보가 있으면 오류 메시지 초기화
      } else {
        setFoundEmail(null);
        setError('일치하는 사용자 정보를 찾을 수 없습니다.'); //일치하는 사용자 정보가 없을 때
      }
    } catch (error) {
      console.error('이메일 찾기 오류:', error);
      setError('다시 시도해 주세요.');
    }
  };

  const accountFindButtons = [
    { text: '비밀번호 찾기', path: () => navigate('/findpassword') },
    { text: '이메일 로그인', path: () => navigate('/emaillogin') },
  ];

  return (
    <>
      <div className={responsiveBox} style={{ overflow: 'hidden' }}>
        <div className={fullContainer}>
          <div>
            <Header imageSrc={back_arrow} alt="back arrow" title="이메일 찾기" />
            <div className={signupFormContainer} style={{ marginTop: '20px' }}>
              <div>
                <SignUpInput
                  label="이름"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="이름을 입력해 주세요"
                  value={formData.userName}
                  onChange={e => handleChange('userName', e.target.value)}
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
                  onChange={e => handleChange('gender', e.target.value)}
                />
                {errors.gender && <div className={errorMessage}>{errors.gender}</div>}
              </div>

              <div className={signupFormGap}>
                <SignUpDateSelect label="생년월일" value={formData.birthDate} onChange={handleChange} />
                {errors.birthDate && <div className={errorMessage}>{errors.birthDate}</div>}
              </div>

              <div className={submitbuttonContainer}>
                <Button type="button" text="이메일 찾기" width='100%' onClick={handleFindEmail} />
              </div>

              {foundEmail && <div className={foundResultStyle}>{foundEmail}</div>}
              {error && <div className={foundResultStyle}>{error}</div>}

              <div className={accountFindBox}>
                {accountFindButtons.map((button, index) => (
                  <div key={index} className={accountFindButton} onClick={button.path}>
                    {button.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindEmail;
