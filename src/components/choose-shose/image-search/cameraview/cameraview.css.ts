import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const CameraComponent_Container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  background: theme.color.black,
  position: 'absolute',
  zIndex: '0',
});

export const CameraComponent_View = style({
  width: '100vw',
  height: 'auto',
});
