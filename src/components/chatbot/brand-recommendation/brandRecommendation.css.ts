import { style } from '@vanilla-extract/css';

export const brandRecommendWrap = style({
  display: 'flex',
  flexDirection: 'column',
})

export const brandRecommendContainer = style({
  width:'100vh',
  display: 'flex',
  gap:'10px'
})

export const brandRecommendIconWrap = style({
  display: 'flex',
  justifyContent: 'start',
  marginTop:'10px'
})

export const brandRecommendIcon = style({
  marginRight: '10px',
  cursor:'pointer'
})