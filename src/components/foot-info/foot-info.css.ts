import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',
  position: 'relative',
});

export const imgDiv = style({
  marginTop: '135px',
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
