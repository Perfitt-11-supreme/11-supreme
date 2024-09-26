import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';
import { media } from '../../styles/media.css';

export const signupFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  overflowY: 'auto',
  padding: '0 16px',
});

export const errorMessage = style({
  color: theme.color.red800,
  fontSize: '12px',
  fontWeight: '400',
  marginTop: '8px',
});

export const signupFormGap = style({
  width: '100%',
  marginTop: '16px',
});

export const submitbuttonContainer = style({
  display: 'flex',
  gap: '4px',
  marginTop: '40px',
  marginBottom: '34px',
  justifyContent: 'center',
  width: '100%',
});

export const signupComponentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const signupSizeTypeContainer = style({
  padding: '0 16px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const signupSizeTypeLabel = style({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17px',
  letterSpacing: '-0.003em',
  userSelect: 'none',
});

export const infosubmitContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px',
  marginTop: '24px',
  marginBottom: '34px',
  padding: '0 16px',
});

export const signupWrap = style([
  {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    position: 'fixed',
    top: '0',
    zIndex: 999,
  },
  media,
]);

export const signupModalContainer = style({
  width: '100%',
  borderRadius: '24px 24px 0px 0px',
  backgroundColor: theme.color.white,
  display: 'flex',
  zIndex: 1000,
  position: 'absolute',
  bottom: '0',
});
