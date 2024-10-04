import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const brandsContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});
export const brandLists = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
});
export const brandListBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});
export const brandNameBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});
export const logoUrlNone = style({
  width: '75px',
  height: '75px',
  backgroundColor: theme.color.black100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
});
export const logoUrlNoneText = style({
  fontSize: '14px',
  color: theme.color.black500,
});

export const hiddenBrand = style({
  display: 'none',
});
export const heartFilledIcon = style({
  cursor: 'pointer',
});
