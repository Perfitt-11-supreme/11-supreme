import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const button = style({
  width: '343px',
  height: '56px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: theme.color.black,
  padding: '14px 16px 14px 16px',
  color: theme.color.white,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});

export const ButtonOpacity = styleVariants({
  opacity: {
    backgroundColor: theme.color.black300,
  },
  nonOpacity: {
    backgroundColor: theme.color.black,
  },
});
