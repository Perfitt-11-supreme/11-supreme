import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const bridgeBrandImageContainer = style({
  width: '120px',
  height: '120px',
  backgroundColor: theme.color.ai_blue500,
  marginBottom: '38px',
});

export const bridgeProductContainer = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  paddingTop: '34px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'hidden',
});

export const bridgeBrandGuideWrap = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  marginTop: '16px',
  fontSize: '18px',
});

export const bridgeBrandGuide = style({
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export const bridgeBrandGuideText = style({
  fontSize: '16px',
  letterSpacing: '-0.003px',
  color: theme.color.cool_gray400,
});
