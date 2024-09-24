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
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column', // 세로로 배치하여 레이아웃이 유지되게 설정

  '@media': {
    'screen and (max-width: 480px)': {
      width: '100%',
      height: '100vh',
      borderRadius: '0',
    },
  },
});
