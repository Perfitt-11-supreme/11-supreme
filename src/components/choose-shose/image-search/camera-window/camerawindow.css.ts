import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const CameraWindow_Rectangle = style({
  position: 'fixed',
  filter: 'brightness(0) invert(0)',
  zIndex: '10',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
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

export const CameraWindow_CameraIconBackground = style({
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '66px',
  height: '66px',
  borderRadius: '50px',
  background: theme.color.black,
  zIndex: '11',
});

export const CameraWindow_CameraIcon = style({
  width: '25px',
  height: '25px',
  filter: 'brightness(0) invert(1)',
});

export const CameraWindow_GalleryIcon = style({
  position: 'fixed',
  left: '10.5%',
  bottom: '30px',
  zIndex: '11',
});

export const CameraWindow_ViewContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: theme.color.white,
  position: 'absolute',
  top: '0',
  zIndex: '0',
});

export const CameraWindow_View = style({
  width: '100%',
  height: 'auto',
});

export const CameraWindow_Canvas = style({
  position: 'fixed',
  bottom: '-100%',
  width: '100%',
  height: 'auto',
  zIndex: '-1',
});
