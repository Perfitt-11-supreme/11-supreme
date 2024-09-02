import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const recommendedQuestionCardBox = style({
  display: 'flex',
  alignItems: 'center',
  width: '144px',
  height: '55px',
  cursor: 'pointer',
  borderRadius: '10px',
  padding: '10px 14px',
  backgroundColor: theme.color.white,
  boxShadow: `0px 1px 2px 0px ${theme.color.black}33`,
});
export const recommendedQuestionCardItem = style({
  width: '116px',
  height: '36px',
  color: theme.color.black500,
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '18px',
  textAlign: 'center',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
