import { style } from '@vanilla-extract/css';
import { theme } from './theme';

export const responsiveBox = style({
  width: '375px',
  height: '812px',
  backgroundColor: theme.color.white,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflowX: 'auto',
  overflowY: 'hidden',

  '@media': {
    'screen and (max-width: 480px)': {
      width: '100%',
      height: '100%',
    },
  },
});
