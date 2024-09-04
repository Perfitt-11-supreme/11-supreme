import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const userBubbleWrap = style({
  width: '100%',
  margin: '20px 0',
  display: 'flex',
  justifyContent:'end'
})

export const userBubble = style({
  display: 'inline-block',
  padding: '10px 14px',
  backgroundColor: theme.color.cool_gray900,
  borderRadius: '6px 0 6px 6px',  
  boxShadow: `0 1px 4px rgba(0, 0, 0, 0.25)`
})

export const userBubbleText = style({
  fontSize: '14px',
  color: 'white',
  letterSpacing: '-0.003em',
})