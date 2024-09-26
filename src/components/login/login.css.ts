import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';
import { media } from '../../styles/media.css';

export const fullContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  overflow: 'hidden',
});

export const loginbuttonContainer = style({
  width: '100%',
  height: 'auto',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
});

export const loginbuttonTextContainer = style({
  fontSize: '14px',
  color: theme.color.black,
  fontWeight: '400',
  lineHeight: '22px',
  letterSpacing: '-0.003em',
  width: '184px',
  height: '22px',
  textAlign: 'center',
});

export const loginContainer = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflowY: 'auto', // 스크롤이 필요할 때 나타나도록 설정
  backgroundColor: 'white',
});
export const loginBubble = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const foundResultStyle = style({
  color: theme.color.black,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  marginBottom: '34px',
  textAlign: 'center',
});

export const inputContainer = style([
  {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    '@media': {
      'screen and (min-width: 768px)': {
        position: 'static',
        boxShadow: 'none',
      },
    },
  },
  media,
]);
