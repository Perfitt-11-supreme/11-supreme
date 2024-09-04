import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const loginButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  borderRadius: '4px',
  backgroundColor: theme.color.gray100,
  cursor: 'pointer',
  width: '184px',
  height: '32px',
  border: 'none',
  boxShadow: 'none',
});

export const loginIcon = style({
  marginRight: '8px',
  width: '24px',
  height: '24px',
  display: 'inline-flex',
  alignItems: 'center',
  verticalAlign: 'middle',
});

export const loginTextbox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  color: theme.color.black,
  fontWeight: '400',
  lineHeight: '22px',
  letterSpacing: '-0.003em',
});
