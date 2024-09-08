import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const sidemenuDimmed = style({
  width: '375px',
  height: '812px',
  backgroundColor: `${theme.color.black}99`,
});
export const sidemenuContainer = style({
  width: '290px',
  height: '812px',
  padding: '0 16px 15px',
  backgroundColor: theme.color.white,
  borderRadius: '0 8px 8px 0',
  position: 'relative',
});

export const sidemenuHeaderContainer = style({
  width: '100%',
  height: '47px',
});

export const hamburgerIconBox = style({
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '3px',
  left: '6px',
  backgroundColor: theme.color.white,
  border: 'none',
  cursor: 'pointer',
});

export const sidemenuNewChatContainer = style({
  width: '100%',
  marginTop: '24px',
});
export const plusButtonBox = style({
  width: '89px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '9px 10px 9px 7px',
  backgroundColor: theme.color.gray100,
  borderRadius: '99px',
  border: 'none',
  cursor: 'pointer',
});
export const newChatText = style({
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  color: theme.color.cool_gray400,
});
export const sidemenuListsContainer = style({});
export const sidemenuListsTitle = style({
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '-0.003em',
  color: theme.color.cool_gray400,
  marginBottom: '8px',
  margin: '15px 0',
});
export const sidemenuListsBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const sidemenuMypageMoveContainer = style({
  marginTop: '195px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
});
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
