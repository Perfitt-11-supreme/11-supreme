import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const myInfoServiceAccordianBox = style({
  padding: '16px',
  borderBottom: `6px solid ${theme.color.gray100}`,
});
export const myInfoServiceAccordianTitle = style({
  color: theme.color.black,
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '16.71px',
  marginBottom: '12px',
});
export const myInfoServiceAccordianText = style({
  color: theme.color.black,
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '16.71px',
  marginBottom: '4px',
});
