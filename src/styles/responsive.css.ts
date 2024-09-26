import { style } from '@vanilla-extract/css';
import { theme } from './theme';

export const responsiveBox = style({
  maxWidth:'428px',
  width: '100%',
  height: '100%',
  maxHeight:'100%',
  backgroundColor: theme.color.white,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column', // 세로로 배치하여 레이아웃이 유지되게 설정

  '@media': {
    'screen and (max-width: 1024px) ': {
      width: '100%',
      height: '100%',
      maxWidth: '768px',
      maxHeight:'100%',
      borderRadius: '0',
    },
  },
});
