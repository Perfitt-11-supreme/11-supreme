import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

const baseKeywordCard = style({
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  padding: '8px 16px',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  borderRadius: '99px',
  cursor: 'pointer',
});

export const keywordCard = style([
  baseKeywordCard,
  {
    backgroundColor: theme.color.white,
    border: `1px solid ${theme.color.cool_gray100}`,
  },
]);

export const keywordCardChecked = style([
  baseKeywordCard,
  {
    color: theme.color.cool_gray400,
    backgroundColor: theme.color.cool_gray100,
    border: `1px solid ${theme.color.cool_gray100}`,
  },
]);
