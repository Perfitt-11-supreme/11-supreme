import { style } from '@vanilla-extract/css';

export const productRecommendPreviewWrap = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '10px',
  overflowX: 'auto', // 수평 스크롤을 가능하게 함
})

export const productRecommendPreviewContainer = style({
  display: 'flex',
  gap: '10px',
  minWidth: '100%', // 컨테이너가 화면을 채우도록 함
  alignItems: 'center',
  padding: '0 12px',
})

export const productRecommendPreviewIconWrap = style({
  display: 'flex',
  justifyContent: 'start',
  marginTop:'10px'
})

export const productRecommendPreviewIcon = style({
  marginRight: '10px',
  cursor:'pointer'
})

export const productRecommendPreviewMore = style({
  width:'30px',
  display: 'flex',
  flexDirection: 'column',
  cursor:'pointer'
})

export const productRecommendPreviewMoreIcon = style({
  width: '22px',
  height:'22px',
})