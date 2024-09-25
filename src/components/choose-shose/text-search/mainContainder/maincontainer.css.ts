import { style } from '@vanilla-extract/css';

export const MainContainter_Background = style({
  display: 'flex',
  flexGrow: 1, // 메인 컨테이너가 남은 공간을 채우도록 설정
  overflowY: 'auto', // 스크롤 가능하게 설정
  marginBottom: '114px',
  justifyContent: 'center',
  height: '642px',
});
