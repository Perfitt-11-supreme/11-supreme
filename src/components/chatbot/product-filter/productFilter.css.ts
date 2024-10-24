import { style } from '@vanilla-extract/css';
import { polygon2 } from '../../../assets/assets';
import { theme } from '../../../styles/theme';

export const productRecommendFilterWrap = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems:'center',
  padding: '10px 16px',
  marginTop:'16px'
})

export const productRecommendFilterContainer = style({
  display:'flex'
})

export const productRecommendFilterDetail = style({
  cursor: 'pointer'
})

export const productRecommendFiltering = style({
  appearance: 'none',
  border: 'none',
  width:'75px',
  display: 'flex',
  color: theme.color.cool_gray400,
  fontSize: '14px',
  fontWeight: '500',
  backgroundImage: `url(${polygon2})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'calc(100%) 6px',
  backgroundSize: 'auto',
  transition: 'all 0.2s ease-out',
  marginRight:'5px',
  ':focus': {
    outline: 'none',  // 포커스 시 아웃라인 제거
    boxShadow: 'none', // 포커스 시 그림자 제거
  },
})

export const productRecommendWrapper = style({
  height: '700px', // 또는 원하는 고정 높이
  overflowY: 'auto',
  
});

export const productRecommend = style({
  width:'100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', 
  gap: '10px',
  height:'auto',
  overflowY: 'scroll', // 세로로 스크롤이 생기도록 설정
  overflowX: 'hidden', // 가로로 스크롤이 생기지 않도록 설정
  padding:'0 16px 16px'
  
})
