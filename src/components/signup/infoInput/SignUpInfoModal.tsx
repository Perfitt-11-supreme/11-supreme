import { useEffect, useState } from 'react';
import useUserStore from '../../../stores/useUserStore';
import ToastMessage from '../../toastmessage/toastMessage';
import Modal from '../../common/modal/Modal';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../signup.css';
import SignUpInput from './signupinput/SignUpInput';
import SignUpSelect from './signupselect/SignUpSelect';
import SignUpDateSelect from './signupdateselect/SignUpDateSelect';
import Button from '../../common/button/Button';
import { auth, USER_COLLECTION } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { getDocs, query, where } from 'firebase/firestore';

type SignUpInfoModalProps = {
  isOpen: boolean; //부모로부터 전달받은 isModalOpen 상태
  onNext: () => void;
};

const SignUpInfoModal: React.FC<SignUpInfoModalProps> = ({ isOpen, onNext }) => {
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
        //파이어스토어에서 이미 가입된 이메일 확인
        const q = query(USER_COLLECTION, where('email', '==', email)); //쿼리 생성
        const querySnapshot = await getDocs(q); //해당 이메일에 대한 파이어스토어 문서를 가져옴

        //해당 이메일에 대한 파이어스토어 문서가 있는 경우
        if (!querySnapshot.empty) {
          setToastMessage({ message: '이미 가입된 이메일입니다.', duration: 3000 });
          return; //이미 가입된 이메일인 경우, 다음 단계로 진행하지 않음
        }

        //해당 이메일에 대한 파이어스토어 문서가 없지만, 인증은 되어 있는 경우
        if (auth.currentUser) {
          const currenUser = auth.currentUser; //현재 인증된 Firebase Authentication 정보 가져오기

          //zustand에 사용자 정보 저장
          const existingEmailUser = {
            uid: currenUser.uid, //Firebase Authentication에서 가져온 uid
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
          setUser(existingEmailUser);

          onNext();
        } else {
          //쌩 신규 사용자인 경우
          //사용자 생성
          const userCredential = await createUserWithEmailAndPassword(auth, email, password); //uid 자동 생성
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

          onNext();
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/weak-password') {
            setToastMessage({ message: '안전하지 않은 비밀번호입니다.', duration: 3000 });
          } else {
            setToastMessage({ message: '다시 시도해 주세요.', duration: 3000 });
          }
        } else {
          setToastMessage({ message: '알 수 없는 오류가 발생했습니다.', duration: 3000 });
        }
      }
    }
  };

  const [modalHeight, setModalHeight] = useState<string>('0px'); //초기 높이를 0으로 설정
  const [isAnimating, setIsAnimating] = useState(false); //애니메이션 상태 관리

  useEffect(() => {
    const errorMessages = Object.values(errors).filter(Boolean);
    const additionalHeight = errorMessages.length * 20;
    setModalHeight(`${Math.max(612, 612 + additionalHeight)}px`);

    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }

    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500); //애니메이션 종료 후 상태 변경
      return () => clearTimeout(timer);
    }
  }, [errors, toastMessage, isAnimating]);

  //isOpen 상태에 따라 모달의 높이와 애니메이션 조절
  useEffect(() => {
    if (isOpen) {
      setModalHeight('612px'); //모달이 열리면 높이를 612px로 설정
      setIsAnimating(true);
    } else {
      setModalHeight('0px'); //모달이 닫히면 높이를 0px으로 설정
      setIsAnimating(true);
    }
  }, [isOpen]);

  return (
    <div>
      {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
      <Modal title="회원가입" height={modalHeight} initialHeight="0px" animateHeightOnClick={false}>
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
  );
};

export default SignUpInfoModal;
