import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const sidemenuDimmed = style({
  width: '375px',
  height: '812px',
  backgroundColor: `${theme.color.black}99`,
});
export const sidemenuContainer = style({
  width: '290px',
  height: '100%',
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
  //   backgroundColor: theme.color.white,
  border: 'none',
  cursor: 'pointer',
});

export const sidemenuNewChatContainer = style({
  width: '100%',
});
export const plusIconBox = style({
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '3px',
  left: '6px',
  //   backgroundColor: theme.color.white,
  border: 'none',
  cursor: 'pointer',
});
