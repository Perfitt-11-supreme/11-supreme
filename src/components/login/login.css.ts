import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const fullContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '375px',
  height: '812px',
  margin: '0 auto',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  overflow: 'hidden',
  position:'relative'
});

export const batteryMargin = style({
  height: '34px',
});

export const loginbuttonContainer = style({
  marginLeft: '44px',
  width: '200px',
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

export const recommendedquestioncardContainer = style({
  display: 'flex',
  gap: '8px',
  marginLeft:'16px',
  cursor: 'grab',
  marginBottom:'8px'
});

export const loginHelloContainer = style({
  height:'100%',
  overflowY: 'scroll',
  marginBottom:'30px'
})