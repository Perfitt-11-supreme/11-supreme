import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const ItemCard_Container = style({
  display: 'flex',
  margin: '10px 4% 0 4%',
  width: '90%',
  height: '78px',
  gap: '10px',
  alignItems: 'center',
  boxSizing: 'content-box',
  border: `2px solid ${theme.color.white}`,
  cursor: 'pointer',
});

export const ItemCard_Select = style({
  border: `2px solid ${theme.color.black}`,
  borderRadius: '8px',
});

export const ItemCard_Rectangle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '6px',
  overflow: 'hidden',
  background: theme.color.gray100,
});

export const ItemCard_Image = style({
  borderRadius: '6px',
});

export const ItemCard_Frame = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'auto',
  height: 'auto',
  gap: '10px',
});

export const ItemCard_ShoesBrand = style({
  height: 'auto',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '16.71px',
  color: theme.color.black,
});

export const ItemCard_ShoesName = style({
  height: '15px',
  fontWeight: '500',
  fontSize: '15px',
  lineHeight: '15px',
  letterSpacing: '-0.003em',
  color: theme.color.black,
});

export const ItemCard_ShoesPrice = style({
  height: '15px',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '15px',
  letterSpacing: '-0.003em',
  color: theme.color.black,
});
