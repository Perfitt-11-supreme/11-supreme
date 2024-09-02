import { style } from '@vanilla-extract/css';

export const header = style({
  width: '375px',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
});
export const headerIcon = style({
  cursor: 'pointer',
});
