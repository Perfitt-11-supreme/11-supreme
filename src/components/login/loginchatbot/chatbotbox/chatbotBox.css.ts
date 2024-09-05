import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';
import { perfittlogo } from '../../../../assets/assets';

export const chatbotContainer = style({
  width: '343px',
  height: '104px',
  marginLeft: '16px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'flex-start',
  backgroundColor: theme.color.white,
  borderRadius: '8px',
});

export const chatbotIcon = style({
  width: '28px',
  height: '28px',
  background: `url(${perfittlogo}) no-repeat center center`,
  backgroundSize: 'contain',
});

export const chatbotTextbox = style({
  flex: 1,
  padding: '5px 5px 10px 10px',
  overflowWrap: 'break-word',
  fontSize: '14px',
  color: theme.color.black,
  fontWeight: '400',
  lineHeight: '22px',
  letterSpacing: '-0.003em',
});
