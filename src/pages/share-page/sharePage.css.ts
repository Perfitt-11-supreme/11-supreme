import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const sharePageContainer = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  paddingTop: '34px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'hidden',
});
export const sharePageTextContainer = style({
  width: '100%',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  borderBottom: `1px solid ${theme.color.cool_gray100}`,
});

export const sharePageTitle = style({
  fontSize: '20px',
  fontWeight: 600,
  letterSpacing: '-0.4px',
  lineHeight: '30px',
  color: '#18181B',
});

export const sharePageDate = style({
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '-0.042px',
  color: '#52525B',
});

export const sharePageBubbleContainer = style({
  width: '100%',
  padding: '20px 16px',
  flexGrow: 1,
  overflowY: 'auto',
});

export const sharePageButtonContainer = style({
  padding: '16px',
});
