import { style, keyframes } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const slideIn = keyframes({
  from: {
    transform: 'translateX(-100%)',
  },
  to: {
    transform: 'translateX(0)',
  },
});

export const sidemenuDimmed = style({
  width: '100%',
  height: '100%',
  backgroundColor: `${theme.color.black}99`,
  zIndex: 1000,
  position: 'absolute',
  top: 0,
  animation: `${fadeIn} 0.3s ease-in-out`,
  animationFillMode: 'forwards',
});
export const sidemenuContainer = style({
  width: '290px',
  height: '100%',
  padding: '0 16px 15px',
  backgroundColor: theme.color.white,
  borderRadius: '0 8px 8px 0',
  position: 'relative',
  top: 0,
  transform: 'translateX(-100%)',
  animation: `${slideIn} 0.3s ease-in-out`,
  animationFillMode: 'forwards',
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
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  paddingBottom: '14px',
  position: 'absolute',
  bottom: '15px',
  right: '16px',
  left: '16px',
});
