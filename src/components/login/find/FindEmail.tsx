import { useNavigate } from 'react-router-dom';
import Button from '../../common/button/Button';
import Header from '../../common/header/Header';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../signup/signup.css';
import { accountFindBox, accountFindButton } from '../emaillogin/emailLogin.css';
import { useState } from 'react';
import SignUpInput from '../../signup/infoInput/signupinput/SignUpInput';
import { foundResultStyle, fullContainer } from '../login.css';
import { db } from '../../../firebase/firebase';
import { back_arrow } from '../../../assets/assets';
import { collection, getDocs, query, where } from 'firebase/firestore';
import SignUpDateSelect from '../../signup/infoInput/signupdateselect/SignUpDateSelect';
import SignUpSelect from '../../signup/infoInput/signupselect/SignUpSelect';
import { responsiveBox } from '../../../styles/responsive.css';

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

  const [foundEmail, setFoundEmail] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleFindEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate(formData);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    try {
      const userQuery = query(
        collection(db, 'users'),
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
      setError('이메일 찾기에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const navigate = useNavigate();

  const accountFindButtons = [
    { text: '이메일 로그인', path: '/emaillogin' },
    { text: '비밀번호 찾기', path: '/findpassword' },
    { text: '회원가입', path: '/signupinfo' },
  ];

  return (
    <>
      <div className={responsiveBox}>
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
                <SignUpDateSelect label="생년월일" value={formData.birthDate} onChange={handleChange} />
                {errors.birthDate && <div className={errorMessage}>{errors.birthDate}</div>}
              </div>

              <div className={submitbuttonContainer}>
                <form onSubmit={handleFindEmail}>
                  <Button text="이메일 찾기" />
                </form>
              </div>

              {foundEmail && <div className={foundResultStyle}>{foundEmail}</div>}
              {error && <div className={foundResultStyle}>{error}</div>}

              <div className={accountFindBox}>
                {accountFindButtons.map((button, index) => (
                  <div key={index} className={accountFindButton} onClick={() => navigate(button.path)}>
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
