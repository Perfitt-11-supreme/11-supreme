import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const sidemenuMypageLine = style({
  margin: '0',
  height: '1px',
  border: 'none',
  backgroundColor: theme.color.cool_gray100,
  selectors: {
    '&:first-child': {
      marginBottom: '2px',
    },
    '&:last-child': {
      marginTop: '2px',
    },
  },
});
export const sidemenuMypageMoveButton = style({
  fontWeight: '400',
  fontSize: '16px',
  height: '24px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  backgroundColor: theme.color.white,
  border: 'none',
  cursor: 'pointer',
});
export const sidemenuUserProfileBox = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
export const sidemenuUserProfileButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: theme.color.white,
  border: 'none',
  cursor: 'pointer',
});
export const sidemenuUserProfileIcon = style({
  width: '30px',
  height: '30px',
});
export const sidemenuUserProfileText = style({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
});
export const sidemenuUserProfileLogout = style({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '16.71px',
  letterSpacing: '-0.003em',
  color: theme.color.black500,
  border: 'none',
  backgroundColor: theme.color.white,
  cursor: 'pointer',
});
