import { style } from '@vanilla-extract/css';

export const IsLoading_Window = style({
  position: 'absolute',
  width: '124px',
  height: '124px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const IsLoading_Circle = style({
  position: 'absolute',
});

export const IsLoading_Text = style({
  height: '24px',
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
});

export const IsLoading_MarginTop = style({
  marginTop: '50%',
});
