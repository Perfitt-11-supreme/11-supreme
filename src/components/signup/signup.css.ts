import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const signupFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  overflowY: 'auto',
});

export const errorMessage = style({
  color: theme.color.red800,
  fontSize: '12px',
  fontWeight: '400',
  marginTop: '8px',
});

export const signupFormGap = style({
  marginTop: '16px',
});

export const submitbuttonContainer = style({
  display: 'flex',
  gap: '4px',
  marginTop: '40px',
  marginBottom: '34px',
  justifyContent: 'center',
});

export const signupComponentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const signupSizeTypeContainer = style({
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
});