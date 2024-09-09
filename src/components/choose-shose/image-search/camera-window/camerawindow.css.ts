import { style } from '@vanilla-extract/css';

export const CameraWindow_RectangleContainer = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  zIndex: '10',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const CameraWindow_CloseIcon = style({
  position: 'fixed',
  top: '55px',
  left: '16px',
  width: '24px',
  height: '24px',
  filter: 'brightness(0) invert(1)',
  zIndex: '11',
});
