import { AxiosResponse } from 'axios';
import { axiosClient } from './axiosClient';
type SearchRequestPaths = {
  textSearch: string;
  imageSearch: string;
};
// URI 경로들과 유틸리티 함수를 포함하는 객체 타입 정의
type SerachRequests = SearchRequestPaths & {
  getFullPath: (path: string) => string;
};

// chatRequests 객체 구현
const serachRequests: SerachRequests = {
  textSearch: '/shoes/find', // 맞춤 상품 추천
  imageSearch: '/shoes/find-by-image', // 키워드 리스트
  getFullPath(path: string): string {
    return path.startsWith('/') ? path : `/${path}`;
  },
};

/** 텍스트 검색 */
export const textShoseSearchAPI = (text: string) => {
  return axiosClient.post(serachRequests.getFullPath(serachRequests.textSearch), text);
};

// 이미지 검색
export const ImageShoseSearchAPI = (imageUrl: string| FormData):Promise<AxiosResponse> => {
  return axiosClient.post(serachRequests.getFullPath(serachRequests.imageSearch), imageUrl);
};
