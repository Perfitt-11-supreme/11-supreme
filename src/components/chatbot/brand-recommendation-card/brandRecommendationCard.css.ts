import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const brandRecommendCardWrap = style({
  width: '110px',
  height: '132px',
  borderRadius: '6px',
  border:`1px solid ${theme.color.cool_gray100}`
})

export const brandRecommendImgContainer = style({
  width: '100%',
  height: '103px',
  padding: '7px',
  borderBottom: `1px solid ${theme.color.cool_gray100}`,
  display: 'flex',
  justifyContent: 'content',
  alignItems:'center'
})

export const brandRecommendButton = style({
  width: '100%',
  padding: '8.5px 0',
  cursor:'pointer'
})

export const brandRecommendTextWrap = style({
  color: theme.color.cool_gray600,
  fontSize: '10px',
  display: 'flex',
  justifyContent:'center'
})

export const brandRecommendText = style({
marginRight:'13px'
})