import { style } from '@vanilla-extract/css';

export const container = style({
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
});

export const slidesWrapper = style({
  display: 'flex',
  transition: 'transform 0.3s ease-in-out',
  width: '200%', // 슬라이드 개수에 따라 200% 설정
});

export const slide = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const descP = style({
  margin: '93px 0 70px 0',
  width: '343px',
  fontSize: '24px',
  fontWeight: '800',
  lineHeight: '36px',
  textAlign: 'center',
});

export const buttonDiv = style({
  margin: '92px 0 70px 0',
});

export const slide0 = style({
  transform: 'translateX(0)',
});

export const slide1 = style({
  transform: 'translateX(-50%)',
});
