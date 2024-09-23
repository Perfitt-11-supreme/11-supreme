import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const slidesWrapper = style({
  display: 'flex',
  transition: 'transform 0.3s ease-in-out',
  width: '200%', // 슬라이드 개수에 따라 200% 설정
});

export const slide = style({
  width: '100vw',
  height: '100vh',
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
  marginTop: '92px',
});

export const slide0 = style({
  transform: 'translateX(0)',
});

export const slide1 = style({
  transform: 'translateX(-50%)',
});
