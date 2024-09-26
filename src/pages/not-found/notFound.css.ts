import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const notFoundWrap = style({
  width: '100%',
  height: '100%',
  backgroundColor: theme.color.black900,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  gap:"16px"
})

export const notFoundTextErrorCode = style({
  fontSize: '20px',
  color:theme.color.red600
})
export const notFoundText = style({
  fontWeight: '800',
  fontSize: '30px',
  color:theme.color.white
})

export const notFountImage = style({
  width:'280px'
})

export const notFoundTextDescription = style({
  color: theme.color.cool_gray200,
  fontSize:'14px'
})

export const notFountButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.red600,
  padding: '14px 16px 14px 16px',
  color: theme.color.white,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
})