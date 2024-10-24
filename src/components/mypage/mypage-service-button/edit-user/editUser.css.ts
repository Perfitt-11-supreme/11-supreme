import { style } from '@vanilla-extract/css';

export const editSizeContainer = style({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const editSizeTypeContainer = style({
  //   padding: '0 16px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '8px',
});
export const editSizeTypeLabel = style({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17px',
  letterSpacing: '-0.003em',
  userSelect: 'none',
  marginBottom: '8px',
});
