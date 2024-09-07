import { style } from '@vanilla-extract/css';
import { theme } from '../../../../../styles/theme';

export const CameraComponent_Container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  background: theme.color.black,
});

export const CameraComponent_View = style({
  position: 'relative',
  width: '100vw',
  height: 'auto',
  zIndex: '0',
});
