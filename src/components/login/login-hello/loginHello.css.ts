import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';
import { media } from '../../../styles/media.css';

export const loginHelloFullContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '120vh',
  maxHeight: '100vh',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  overflow: 'hidden',
  backgroundColor: theme.color.white,
  position: 'relative',
});

export const recommendedquestioncardContainer = style({
  display: 'flex',
  gap: '8px',
  marginLeft: '16px',
  cursor: 'grab',
  marginBottom: '8px',
});

export const loginHelloContainer = style({
  width: '100%',
  flex: 1, // flex: 1 추가
  overflowY: 'auto', // scroll에서 auto로 변경
  display: 'flex',
  flexDirection: 'column',
  padding: '0 16px',
  paddingBottom: '150px',
  //  '@media': {
  //   'screen and (max-width: 428px)': {
  //     paddingTop: 'calc(80px + env(safe-area-inset-top))',
  //   },
  //   'screen and (max-width: 427px) ': {
  //     paddingTop: 'calc(0px + env(safe-area-inset-top))',
  //   },
  // },
});

export const loginHelloInputContainer = style([
  {
    position: 'fixed', // sticky에서 fixed로 변경
    bottom: 0,
    zIndex: 105,
  },
  media,
]);
