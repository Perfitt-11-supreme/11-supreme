import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../stores/useUserStore';
import { responsiveBox } from '../../../styles/responsive.css';
import { fullContainer } from '../../login/login.css';
import ToastMessage from '../../toastmessage/toastMessage';
import Header from '../../common/header/Header';
import { hamburger_menu } from '../../../assets/assets';
import Modal from '../../common/modal/Modal';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../signup.css';
import SignUpInput from './signupinput/SignUpInput';
import SignUpSelect from './signupselect/SignUpSelect';
import SignUpDateSelect from './signupdateselect/SignUpDateSelect';
import Button from '../../common/button/Button';
import { auth } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const SignUpInfoInputValid = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState({ year: '', month: '', day: '' });
  const [gender, setGender] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = '이메일을 입력해 주세요';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '유효한 형식의 이메일을 입력해 주세요';
    }
    if (!password) newErrors.password = '비밀번호를 입력해 주세요';
    if (!userName) newErrors.userName = '이름을 입력해 주세요';
    if (!birthDate.year || !birthDate.month || !birthDate.day) newErrors.birthDate = '생년월일을 입력해 주세요';
    if (!gender) newErrors.gender = '성별을 선택해 주세요';
    return newErrors;
  };

  const handleNextPage = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        //사용자 생성 (uid 자동 생성 위함)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //zustand에 사용자 정보 저장
        const newEmailUser = {
          ...user,
          uid: user.uid, //위 메서드 통해 자동 생성된 uid 저장
          birthDate: {
            year: birthDate.year,
            month: birthDate.month,
            day: birthDate.day,
          },
          email: email,
          gender: gender,
          userName: userName,
          // password: password,
        };
        setUser(newEmailUser);

        navigate('/signupsize');
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/email-already-in-use') {
            setToastMessage({ message: '이미 가입된 이메일입니다.', duration: 3000 });
          } else if (error.code === 'auth/weak-password') {
            setToastMessage({ message: '안전하지 않은 비밀번호입니다.', duration: 3000 });
          } else {
            setToastMessage({ message: '다시 시도해 주세요.', duration: 3000 });
          }
        }
      }
    }
  };

  const [modalHeight, setModalHeight] = useState<string>('612px');

  useEffect(() => {
    const errorMessages = Object.values(errors).filter(Boolean);
    const additionalHeight = errorMessages.length * 20;
    setModalHeight(`${Math.max(612, 612 + additionalHeight)}px`);

    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }
  }, [errors, toastMessage]);

  return (
    <div className={responsiveBox}>
      <div className={fullContainer}>
        {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
        <div>
          <Header imageSrc={hamburger_menu} alt="hamburger menu" />
        </div>

        <div>
          <Modal title="회원가입" height={modalHeight} initialHeight="612px" animateHeightOnClick={false}>
            <div className={signupFormContainer}>
              <SignUpInput
                label="아이디"
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력해 주세요"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {errors.email && <div className={errorMessage}>{errors.email}</div>}

              <div className={signupFormGap}>
                <SignUpInput
                  label="비밀번호"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {errors.password && <div className={errorMessage}>{errors.password}</div>}
              </div>

              <div className={signupFormGap}>
                <SignUpInput
                  label="이름"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="이름을 입력해 주세요"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
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
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                />
                {errors.gender && <div className={errorMessage}>{errors.gender}</div>}
              </div>

              <div className={signupFormGap}>
                <SignUpDateSelect
                  label="생년월일"
                  value={{
                    year: birthDate.year,
                    month: birthDate.month,
                    day: birthDate.day,
                  }}
                  onChange={(field, value) => setBirthDate(prev => ({ ...prev, [field]: value }))}
                />
                {errors.birthDate && <div className={errorMessage}>{errors.birthDate}</div>}
              </div>

              <div className={submitbuttonContainer}>
                <Button text="다음" width="100%" onClick={handleNextPage} />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SignUpInfoInputValid;
