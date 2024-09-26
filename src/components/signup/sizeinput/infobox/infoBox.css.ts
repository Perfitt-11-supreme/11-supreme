import { style } from '@vanilla-extract/css';
import { info } from '../../../../assets/assets';
import { theme } from '../../../../styles/theme';

export const infoContainer = style({
  width: '100%',
  height: '104px',
  padding: '16px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'flex-start',
  backgroundColor: theme.color.blue50,
  borderRadius: '8px',
});

export const infoIcon = style({
  width: '24px',
  height: '24px',
  marginRight: '8px',
  background: `url(${info}) no-repeat center center`,
  backgroundSize: 'contain',
});

export const infoTextbox = style({
  flex: 1,
  overflowWrap: 'break-word',
  fontSize: '16px',
  color: theme.color.blue700,
  fontWeight: '400',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
});
