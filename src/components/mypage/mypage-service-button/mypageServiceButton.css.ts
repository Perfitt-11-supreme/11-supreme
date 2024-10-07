import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const myInfoServiceButton = style({
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '16.71px',
  backgroundColor: theme.color.white,
  borderBottom: `1px solid ${theme.color.cool_gray100}`,
  cursor: 'pointer',
});

export const myInfoServiceAccordianContainer = style({
  overflow: 'hidden',
  transition: 'max-height 0.3s ease-out',
});
