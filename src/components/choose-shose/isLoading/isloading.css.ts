import { style, keyframes } from '@vanilla-extract/css';

const rotation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

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
  animation: `${rotation} 2s linear infinite`,
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
