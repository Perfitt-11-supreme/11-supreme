import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';
import { media } from '../../../styles/media.css';

export const CameraWindow_Rectangle = style({
  position: 'fixed',
  filter: 'brightness(0) invert(0.3)',
  zIndex: '10',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
});

export const CameraWindow_Icons = style([
  {
    position: 'fixed',
    bottom: '20px',
    zIndex: '11',
    display: 'flex',
    alignItems: 'center',
  },
  media,
]);

export const CameraWindow_CameraIconBackground = style({
  position: 'relative',
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
  cursor: 'pointer',
});

export const CameraWindow_CameraIcon = style({
  width: '25px',
  height: '25px',
  filter: 'brightness(0) invert(1)',
});

export const CameraWindow_GalleryIcon = style({
  position: 'relative',
  cursor: 'pointer',
});

export const CameraWindow_ViewContainer = style([
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    background: theme.color.white,
    position: 'absolute',
    top: '0',
    zIndex: '0',
  },
  media,
]);

export const CameraWindow_View = style({
  width: '100%',
  height: 'auto',
});
