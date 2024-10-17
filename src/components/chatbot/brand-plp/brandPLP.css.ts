import { style } from '@vanilla-extract/css';
export const brandPlpWrap = style({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

export const brandPlpNameContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '16px 0',
  padding: '0 16px',
});

export const brandPlpBrandImage = style({
  width: '100%',
  height: 'auto',
  backgroundColor: 'red',
  position: 'relative', // 브랜드 이미지 내 좋아요 버튼 - 히윤
});

export const brandPlpFilterButtonWrap = style({
  display: 'flex',
  gap: '5px',
  padding: '16px 16px 0',
});

// 브랜드 이미지 내 좋아요 버튼 - 하윤
export const heartIconBox = style({
  position: 'absolute',
  top: '11px',
  right: '16px',
  cursor: 'pointer',
});
