import { style } from '@vanilla-extract/css';
import { theme } from '../../../../../styles/theme';

export const SimilarProduct_Container = style({
  width: '100%',
  height: '100%',
  paddingTop: '29px',
  paddingBottom: '108px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SimilarProduct_ScrollableContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  overflowY: 'scroll',

  selectors: {
    '&::-webkit-scrollbar': {
      width: '6px', // 스크롤바의 너비를 줄임
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // 스크롤바의 색상
      borderRadius: '10px', // 스크롤바의 모서리를 둥글게
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent', // 스크롤바 트랙의 배경
    },
  },
});

export const SimilarProduct_ItemCardsContainer = style({
  width: '90%',
});

export const SimilarProduct_Button = style({
  height: '13%',
  position: 'fixed',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
