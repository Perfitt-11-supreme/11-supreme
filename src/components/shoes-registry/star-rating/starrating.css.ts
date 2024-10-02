import { style } from '@vanilla-extract/css';

export const starContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  marginTop: '10px',
});

export const star = style({
  cursor: 'pointer',
  width: '36px',
  height: '36px',
});
