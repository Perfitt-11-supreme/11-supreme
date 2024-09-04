import { style } from '@vanilla-extract/css';
import { polygon2 } from '../../../assets/assets.css';
import { theme } from '../../../styles/theme';

export const productRecommendWrap = style({
  width: '100%',
  display: "flex",
  flexDirection:'column',
  paddingTop:'16px'
})

export const productRecommendTextWrap = style({
  width: '100%',
  height: 'auto',
  display: "flex",
  alignItems: 'center',
  padding:'0 16px'
})

export const chatBotRecommendText = style({
  fontWeight: 600,
  fontSize: '14px',
  marginLeft: '10px',
})

export const ProductRecommendResult = style({
  fontWeight:'600'
})

export const productRecommendFilterWrap = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems:'center',
  padding: '10px 0',
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
