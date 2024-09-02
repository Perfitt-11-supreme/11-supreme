import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const inputBox = style({
  width: '343px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});
export const inputLabel = style({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17px',
  letterSpacing: '-0.003em',
  userSelect: 'none',
});
export const input = style({
  width: '100%',
  height: '48px',
  padding: '14px 16px',
  color: theme.color.cool_gray600,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  backgroundColor: theme.color.white,
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '4px',
  transition: 'all 0.2s ease-out',
  selectors: {
    '&::placeholder': {
      color: theme.color.cool_gray400,
    },
  },
  ':focus': {
    outlineColor: theme.color.ai_blue500,
  },
});
