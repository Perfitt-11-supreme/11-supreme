import { hamburger_menu } from '../assets/assets.css';
import Button from './common/button/Button';
import DateSelect from './logindateselect/LoginDateSelect';
import Header from './common/header/Header';
import Input from './logininput/LoginInput';
import Modal from './common/modal/Modal';
import Select from './loginselect/LoginSelect';

const SignUpInfoInput = () => {
  return (
    <>
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

        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            height: '406px',
            alignItems: 'center',
          }}
        >
          <Input label="아이디" type="email" name="userEmail" id="userEmail1" placeholder="이메일을 입력해주세요" />

          <Input
            label="비밀번호"
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="비밀번호를 입력해주세요"
          />

          <Input label="이름" type="text" name="userName" id="userName" placeholder="이름을 입력해 주세요" />

          <Select
            id="gender"
            label="성별"
            options={[
              { value: '', label: '성별을 선택해 주세요' },
              { value: 'male', label: '남성' },
              { value: 'female', label: '여성' },
            ]}
          />

          <DateSelect label="생년월일" />
        </form>

        <div
          style={{
            display: 'flex',
            gap: '4px',
            marginTop: '40px',
            marginBottom: '34px',
            justifyContent: 'center',
          }}
        >
          <Button text="다음" />
        </div>
      </div>
    </>
  );
};

export default SignUpInfoInput;
