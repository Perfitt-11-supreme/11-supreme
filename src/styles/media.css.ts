import { style } from '@vanilla-extract/css';

export const media = style({
  maxWidth: '428px',
  width: '100%',
  '@media': {
    'screen and (max-width: 1024px) ': {
      maxWidth: '768px',
      maxHeight: '100%',
    },
  },
});
