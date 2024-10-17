export type TProduct = {
  brand: string;
  image: string;
  modelName: string;
  link?: string;
  modelNo?: string;
  productId?: string;
  gender?: string;
  price?: number;
  sizeRecommend?: string;
  uid?: string; // 추가 - 하윤
  timestamp?: string; // 추가 - 하윤
  isLiked?: boolean; // 추가 - 하윤
} | null;
