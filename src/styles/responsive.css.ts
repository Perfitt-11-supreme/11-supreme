import { media } from './media.css';
import { style } from '@vanilla-extract/css';
import { theme } from './theme';

export const layoutWraper = style({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'hidden',
});

export const responsiveBox = style([
  {
    height: '100%',
    backgroundColor: theme.color.white,
    display: 'flex',
    flexDirection: 'column', // 세로로 배치하여 레이아웃이 유지되게 설정
  },
  media,
]);
