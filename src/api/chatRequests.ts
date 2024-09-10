import { TKeyWordsData } from "../types/keywords";
import { axiosClient } from "./axiosClient";

// URI 경로들의 타입 정의 (평탄화된 구조)
type ChatRequestPaths = {
  shoesRecommend: string;
  keywords: string;
  questionRecommend: string;
  chatCompletions: string;
  chatKeywords: string;
};

// URI 경로들과 유틸리티 함수를 포함하는 객체 타입 정의
type ChatRequests = ChatRequestPaths & {
  getFullPath: (path: string) => string;
};

// chatRequests 객체 구현
const chatRequests: ChatRequests = {
  shoesRecommend: '/shoes/recommend', // 맞춤 상품 추천 
  keywords: '/keywords', // 키워드 리스트 
  questionRecommend: '/question/recommend', // 질문추천 
  chatCompletions: '/chat/completions', // 채팅응답 
  chatKeywords: '/chat/completions/keywords', // 채팅응답 키워드 
  getFullPath(path: string): string {
    return path.startsWith('/') ? path : `/${path}`;
  },
};

/** 맞춤 상품 추천 */
export const shoesRecommendAPI = () => {
  return axiosClient.get(chatRequests.getFullPath(chatRequests.shoesRecommend));
};

/** 키워드 리스트 */
export const keywordsListAPI = () => {
  return axiosClient.get(chatRequests.getFullPath(chatRequests.keywords));
};

/** 질문 추천 */
export const recommendQuestionAPI = () => {
  return axiosClient.get(chatRequests.getFullPath(chatRequests.questionRecommend));
};

/** 채팅 응답 */
export const chatCompletionsAPI = (data: any) => {
  return axiosClient.post(chatRequests.getFullPath(chatRequests.chatCompletions), data);
};

/** 채팅 응답 키워드 */
export const chatKeywordsAPI = (data: TKeyWordsData) => {
  return axiosClient.post(chatRequests.getFullPath(chatRequests.chatKeywords), data);
};