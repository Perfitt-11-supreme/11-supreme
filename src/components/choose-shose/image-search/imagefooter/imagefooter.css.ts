import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const ImageFooter_CameraIconBackground = style({
  position: 'fixed',
  bottom: '20px',
  left: '50vw',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '66px',
  height: '66px',
  borderRadius: '50px',
  background: theme.color.white,
  transition: 'bottom 0.3s ease',
  zIndex: '11',
});

export const ImageFooter_CameraIcon = style({
  width: '25px',
  height: '25px',
});

export const ImageFooter_GalleryIcon = style({
  position: 'fixed',
  left: '10.5vw',
  bottom: '20px',
  transition: 'bottom 0.3s ease',
  zIndex: '11',
});

export const ImageFotter_IconMove = styleVariants({
  moved: {
    bottom: '220px',
  },
  static: {
    bottom: '20px',
  },
});
