import { Timestamp } from 'firebase/firestore';

export type User = {
  uid: string;
};

export type ShoeData = {
  id?: string;
  image?: string;
  brand?: string;
  modelName?: string;
  rating: number;
  length: string;
  width: string;
  height: string;
  sole: string;
  weight: string;
  recommendation: string;
  review: string;
  timestamp: Timestamp;
};

export type Errors = {
  rating?: string;
  length?: string;
  width?: string;
  height?: string;
  sole?: string;
  weight?: string;
  review?: string;
};
