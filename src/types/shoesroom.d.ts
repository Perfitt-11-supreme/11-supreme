import { Timestamp } from 'firebase/firestore';

export type ShoesList = {
  id: string;
  image: string;
  name: string;
  timestamp: Timestamp;
  uid: string;
};

export type UserData = {
  uid: string;
  email: string;
  gender: string;
  shoeSize: number;
  userName: string;
};
