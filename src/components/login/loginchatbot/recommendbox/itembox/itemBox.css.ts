import { style } from '@vanilla-extract/css';
import { theme } from '../../../../../styles/theme';

export const individualitemContainer = style({
  width: '210px',
  height: '52px',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: theme.color.white,
});

export const textTop = style({
  fontSize: '14px',
  color: theme.color.black,
  fontWeight: '600',
  lineHeight: '17px',
  letterSpacing: '-0.003em',
});

export const fullContainer = style({
  width: '226px',
  padding: '8px',
  boxSizing: 'border-box',
  border: '1px solid',
  borderColor: theme.color.gray100,
  borderRadius: '6px',
  backgroundColor: theme.color.white,
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const itemIcon = style({
  width: '48px',
  height: '50px',
  marginRight: '10px',
  backgroundColor: theme.color.gray100,
  borderRadius: '4px',
});

export const textboxContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  flex: 1,
  width: '148px',
});

export const textboxRegular = style({
  fontSize: '12px',
  color: theme.color.black,
  fontWeight: '400',
  lineHeight: '18px',
  letterSpacing: '0em',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const textboxSemibold = style({
  fontSize: '12px',
  color: theme.color.black,
  fontWeight: '600',
  lineHeight: '16px',
  letterSpacing: '0em',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const textBottom = style({
  fontSize: '12px',
  color: theme.color.gray400,
  fontWeight: '500',
  lineHeight: 'auto',
  letterSpacing: '0em',
  textAlign: 'center',
});

export const textBottomContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  border: 'none',
  background: 'none',
  padding: '0px',
  margin: '0px',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
});

export const textBottomIcon = style({
  width: '3px',
  height: '6px',
  backgroundColor: theme.color.white,
});

export const itemContainerButton = style({
  border: 'none',
  background: 'none',
  padding: '0px',
  margin: '0px',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
});
