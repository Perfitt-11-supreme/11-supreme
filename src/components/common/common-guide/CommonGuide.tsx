import { ai, back_arrow, hamburger_menu } from '../../../assets/assets';
import { theme } from '../../../styles/theme';
import Button from '../button/Button';
import ChatbotSearchInput from '../chatbot-search-input/ChatbotSearchInput';
import DateSelect from '../date-select/DateSelect';
import Header from '../header/Header';
import Input from '../input/Input';
import KeywordCard from '../keyword-card/KeywordCard';
import Modal from '../modal/Modal';
import ProductRecommendationCard from '../product-recommendation-card/ProductRecommendationCard';
import RecommendedQuestionCard from '../recommended-question-card/RecommendedQuestionCard';
import Select from '../select/Select';
import SizeRecommendationCard from '../size-recommendation-card/SizeRecommendationCard';

const CommonGuide = () => {
  return (
    <>
      {/* 공통 테마, 아이콘 세팅 */}
      <div>
        <h1 style={{ color: theme.color.ai_red500 }}>폰트 적용 테스트</h1>
        <span style={{ backgroundColor: theme.color.ai_purple500 }}>아이콘 적용 테스트</span>
        <img src={ai} alt="ai" />
      </div>
      {/* 공통 컴포넌트 - 버튼 */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <Button text="다음" />
        <Button text="시작하기" />
        <Button text="가입완료" />
      </div>
      {/* 공통 컴포넌트 - 챗봇 검색 */}
      <ChatbotSearchInput />
      {/* 공통 컴포넌트 - 추천 질문 카드 */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <RecommendedQuestionCard text="비 오는날 신기 좋은 레인부츠 브랜드 알려줘" />
        <RecommendedQuestionCard text="요즘 등산할 때 신기 좋은 가벼운 등산화 추천해줘" />
        <RecommendedQuestionCard text="비 오는날 신기 좋은 레인부츠 브랜드 알려줘" />
      </div>
      {/* 공통 컴포넌트 - 인풋 */}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input label="아이디" type="email" name="userEmail" id="userEmail1" placeholder="이메일을 입력해주세요" />
        <Input
          label="비밀번호"
          type="password"
          name="userPassword"
          id="userPassword"
          placeholder="비밀번호를 입력해주세요"
        />
        <Input label="이름" type="text" name="userName" id="userName" placeholder="이름을 입력해 주세요" />
        {/* 공통 컴포넌트 - 셀렉트박스 */}
        <Select
          id="gender"
          label="성별"
          options={[
            { value: '', label: '성별을 선택해 주세요' },
            { value: 'male', label: '남성' },
            { value: 'female', label: '여성' },
          ]}
        />
        {/* 공통 컴포넌트 - 셀렉트박스 날짜 */}
        <DateSelect label="생년월일" />
      </form>
      {/* 공통 컴포넌트 - 키워드 카드 */}
      <div style={{ maxWidth: '335px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        <KeywordCard text="스니커즈" />
        <KeywordCard text="운동" />
        <KeywordCard text="산책" />
        <KeywordCard text="운동화" />
        <KeywordCard text="구두" />
        <KeywordCard text="샌들" />
        <KeywordCard text="레인부츠" />
        <KeywordCard text="슬리퍼" />
      </div>
      {/* 공통 컴포넌트 - 모달 */}
      <div style={{ display: 'flex' }}>
        <Modal title="관심 키워드" height="340px" />
        <Modal title="회원가입" height="612px" />
      </div>
      {/* 공통 컴포넌트 - 헤더 */}
      <Header imageSrc={hamburger_menu} alt="hamburger menu" />
      <Header imageSrc={back_arrow} alt="back arrow" />
      {/* 공통 컴포넌트 - 사이즈 추천 카드 */}
      <SizeRecommendationCard />
      {/* 공통 컴포넌트 - 상품 추천 카드 */}
      <ProductRecommendationCard />
    </>
  );
};

export default CommonGuide;
