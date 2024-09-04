import { style } from '@vanilla-extract/css';

export const userDiv = style({
  display: 'flex',
  // width: '229px',
  height: '50px',
  marginLeft: '28px',
  alignItems: 'center',
  marginTop: '5px',
});

export const userButton = style({
  width: '50px',
  height: '50px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  marginRight: '14px',
});

export const nameP = style({
  fontWeight: 'bold',
  lineHeight: '20px',
  marginBottom: '0',
  letterSpacing: '-0.003em',
});

export const descP = style({
  marginTop: '4px',
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '-0.003em',
});
