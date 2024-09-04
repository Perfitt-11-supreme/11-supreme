import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const chatbotSearchContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: theme.color.gray100,
  width: '375px',
  height: '104px',
  padding: '16px 16px 40px 16px',
  position: 'relative',
  zIndex:2
});

export const pictureIconBox = style({
  cursor: 'pointer',
});

export const chatbotSearchInputBox = style({
  width: '311px',
  height: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  backgroundColor: theme.color.white,
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '99px',
  position: 'relative',
});

export const chatbotSearchInput = style({
  width: '100%',
  height: '100%',
  paddingLeft: '16px',
  paddingRight: '56px',
  color: theme.color.cool_gray600,
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  borderRadius: '99px',
  border: 'none',
  transition: 'all 0.2s ease-out',
  ':focus': {
    outlineColor: theme.color.ai_blue500,
  },
});

export const uploadIconBox = style({
  cursor: 'pointer',
  position: 'absolute',
  right: '4px',
});
