import { style } from '@vanilla-extract/css';

export const ItemListBox_Container = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1, // 메인 컨테이너가 남은 공간을 채우도록 설정
  overflowY: 'auto', // 스크롤 가능하게 설정
  width: '100%',
  height: 'auto',
  paddingBottom: '108px',
});

export const ItemListBox_PaddingTop = style({
  paddingTop: '65px',
});
