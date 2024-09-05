import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const fullContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '375px',
  height: '812px',
  margin: '0 auto',
  boxSizing: 'border-box',
});

export const batteryMargin = style({
  height: '34px',
});

export const loginbuttonContainer = style({
  marginTop: '-45px', //기본적으로 마진탑이 45px인데 왜 그런건지.....
  marginLeft: '44px',
  width: '200px',
  height: '190px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
});

export const loginbuttonTextContainer = style({
  fontSize: '14px',
  color: theme.color.black,
  fontWeight: '400',
  lineHeight: '22px',
  letterSpacing: '-0.003em',
  width: '184px',
  height: '22px',
  textAlign: 'center',
});

export const recommendedquestioncardContainer = style({
  display: 'flex',
  overflowX: 'hidden',
  gap: '8px',
  marginTop: 'auto',
});
