import { style } from '@vanilla-extract/css';
import { theme } from '../../../../../styles/theme';

export const ItemCard_Container = style({
  display: 'flex',
  width: '343px',
  height: '77px',
  gap: '10px',
  alignItems: 'center',
  marginLeft: '16px',
  marginTop: '10px',
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

export const ItemCard_Rectangle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '77px',
  height: '77px',
  borderRadius: '6px',
  background: theme.color.gray100,
});
