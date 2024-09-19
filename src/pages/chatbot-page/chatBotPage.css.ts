import { style } from '@vanilla-extract/css';

export const chatBotContainer = style({
  width: '375px',
  height: '812px',
  backgroundColor: 'white',
  paddingTop: '34px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflowY: 'hidden',
});

export const chatBubbleWrap = style({
  padding: '20px 16px 8px',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowX: 'hidden',
  overflowY: 'scroll',
});

export const chatBotCardWrap = style({
  paddingLeft: '12px',
});

export const chatBotModalWrap = style({
  position: 'relative',
});

export const keywordWrap = style({
  width: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  padding: '0 16px 16px',
});
