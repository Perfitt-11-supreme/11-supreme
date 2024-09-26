import { style } from '@vanilla-extract/css';
import { theme } from './theme';

export const layoutWraper = style({
  // width: '100%',
  // height: '100%',
  // // maxHeight:'100vh',
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  // // overflowY: 'auto',
});

export const responsiveBox = style({
  maxWidth: '428px',
  width: '100%',
  height: '100%',
  backgroundColor: theme.color.white,
  display: 'flex',
  flexDirection: 'column', // 세로로 배치하여 레이아웃이 유지되게 설정
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  '@media': {
    'screen and (max-width: 1024px) ': {
      width: '100%',
      height: '100%',
      maxWidth: '768px',
      maxHeight: '100%',
    },
  },
});
