import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  height: '100%',
});

export const contentContainer = style({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const footInfoWrap = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})
export const imgDiv = style({
  width: '284px',
  height: 'auto',
});

export const bigP = style({
  fontWeight: 'bold',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  marginBottom: '8px',
});

export const smallP = style({
  lineHeight: '22px',
  letterSpacing: '-0.003em',
  fontSize: '14px',
  marginBottom: '172px',
  color: '#808080',
});

export const buttonDiv = style({
  margin: '92px 0 36px 0',
});
