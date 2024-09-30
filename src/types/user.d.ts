export type TUser = {
  email?: string;
  // password?: string;
  userName?: string;
  gender?: string;
  birthDate?: {
    year: string;
    month: string;
    day: string;
  };
  shoeSize?: number;
  sizeType?: string;
  uid?: string; //회원가입 시 자동 생성
  textSearchRecord?: string;
  // isGoogle?: boolean;
  // signupStep?: string;
};
