import { useState } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../firebase/firebase';
import { responsiveBox } from '../../../../styles/responsive.css';
import { foundResultStyle, fullContainer } from '../../../login/login.css';
import { back_arrow } from '../../../../assets/assets';
import { errorMessage, signupFormContainer, signupFormGap, submitbuttonContainer } from '../../../signup/signup.css';
import SignUpInput from '../../../signup/infoInput/signupinput/SignUpInput';
import Button from '../../../common/button/Button';
import Header from '../../../common/header/Header';
import useUserStore from '../../../../stores/useUserStore';

const EditPassword = () => {
  type FormErrors = {
    currentPassword?: string;
    newPassword?: string;
  };

  type FormData = {
    currentPassword: string;
    newPassword: string;
  };

  const navigate = useNavigate();
  const { clearUser } = useUserStore(); // useUserStore에서 clearUser 메서드 가져오기
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해 주세요';
    }
    if (!data.newPassword || data.newPassword.length < 6) {
      newErrors.newPassword = '6자 이상의 새 비밀번호를 입력해 주세요';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    setErrors({});

    const errors = validate(formData);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    try {
      const user = auth.currentUser;

      if (user && formData.currentPassword) {
        const credential = EmailAuthProvider.credential(user.email!, formData.currentPassword);

        // 현재 비밀번호로 재인증
        await reauthenticateWithCredential(user, credential);

        // 새로운 비밀번호로 변경
        await updatePassword(user, formData.newPassword);
        setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
        setError('');

        // 3초 뒤에 로그아웃 및 페이지 이동
        setTimeout(async () => {
          await signOut(auth);
          clearUser(); // Zustand에서 사용자 상태 초기화
          navigate('/login', { replace: true });
        }, 3000);
      } else {
        setError('사용자를 찾을 수 없습니다.');
      }
    } catch (error) {
      setError('비밀번호 변경 중 오류가 발생했습니다. 현재 비밀번호를 확인해 주세요.');
      setSuccessMessage(null);
      console.error(error);
    }
  };

  return (
    <>
      <div className={responsiveBox} style={{ overflow: 'hidden' }}>
        <div className={fullContainer}>
          <div>
            <Header imageSrc={back_arrow} alt="back arrow" title="비밀번호 변경" />
            <div className={signupFormContainer} style={{ marginTop: '20px' }}>
              <div>
                <SignUpInput
                  label="현재 비밀번호"
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="현재 비밀번호를 입력해 주세요"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
                {errors.currentPassword && <div className={errorMessage}>{errors.currentPassword}</div>}
              </div>

              <div className={signupFormGap}>
                <SignUpInput
                  label="새 비밀번호"
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="새 비밀번호를 입력해 주세요"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                {errors.newPassword && <div className={errorMessage}>{errors.newPassword}</div>}
              </div>

              <div className={submitbuttonContainer}>
                <Button type="button" text="비밀번호 변경" width="100%" onClick={handleChangePassword} />
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

export default EditPassword;
