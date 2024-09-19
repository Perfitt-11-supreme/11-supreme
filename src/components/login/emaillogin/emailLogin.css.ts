import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const accountFindBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '36px',
});

export const accountFindButton = style({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '16.71px',
  textAlign: 'center',
  cursor: 'pointer',
  color: theme.color.gray400,
});
