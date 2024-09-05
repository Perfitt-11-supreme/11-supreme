import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',
  position: 'relative',
});

export const descP = style({
  margin: '93px 0 70px 0',
  width: '343px',
  height: '72px',
  fontSize: '24px',
  fontWeight: '800',
  lineHeight: '36px',
  textAlign: 'center',
});

export const buttonDiv = style({
  margin: '92px 0 36px 0',
});
