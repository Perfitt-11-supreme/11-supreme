import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';
import { media } from '../../../styles/media.css';

// export const headerSpacer = style({
//   height: '56px',
// });
export const headerContainer = style([
  {
    // position: 'fixed',
    top: '0',
    // zIndex: '99',
    // maxWidth: '428px',
    width: '100%',
  },
  media,
]);
export const header = style({
  width: '100%',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  backgroundColor: theme.color.white,
  position: 'relative',
});
export const headerIcon = style({
  cursor: 'pointer',
});
export const headerTitle = style({
  fontWeight: '600',
  fontSize: '18px',
  lineHeight: '24px',
  letterSpacing: '-0.015em',
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: ' translate(-50%, -50%)',
});
