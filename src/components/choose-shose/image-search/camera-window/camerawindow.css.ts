import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const CameraWindow_Container = style({
  width: '100vw',
  height: '100vh',
  background: theme.color.black,
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
});
