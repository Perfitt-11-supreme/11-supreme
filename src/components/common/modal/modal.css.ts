import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const modalContainerWrapper = style({
  position: 'relative',
  width: '375px',
  height: 'auto',
});

export const modalContainer = style({
  width: '100%',
  paddingTop: '8px',
  backgroundColor: theme.color.white,
  borderRadius: '24px 24px 0px 0px',
  boxShadow: `0px -1px 4px 0px ${theme.color.black}26;`,
  position: 'absolute',
  bottom: '0px',
  zIndex: 100,
});
export const barBox = style({
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
});
export const modalContainerTitle = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px 98px',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '24px',
  letterSpacing: '-0.015em',
  textAlign: 'center',
  marginTop: '8px',
});
