import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const ItemCard_Container = style({
  display: 'flex',
  width: '90vw',
  height: '9.5vh',
  gap: '1.3vh',
  alignItems: 'center',
  boxSizing: 'content-box',
  marginLeft: '2px',
  marginTop: '10px',
});

export const ItemCard_Select = style({
  border: `2px solid ${theme.color.black}`,
  borderRadius: '8px',
  marginLeft: '0',
});

export const ItemCard_Rectangle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '6px',
  background: theme.color.gray100,
});

export const ItemCard_Frame = style({
  display: 'flex',
  flexDirection: 'column',
  width: '256px',
  height: '59px',
  gap: '6px',
});

export const ItemCard_ShoseBrand = style({
  height: '17px',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '16.71px',
  color: theme.color.black,
});

export const ItemCard_ShoseName = style({
  height: '15px',
  fontWeight: '500',
  fontSize: '15px',
  lineHeight: '15px',
  letterSpacing: '-0.003em',
  color: theme.color.black,
});

export const ItemCard_ShosePrice = style({
  height: '15px',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '15px',
  letterSpacing: '-0.003em',
  color: theme.color.black,
});
