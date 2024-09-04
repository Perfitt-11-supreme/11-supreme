import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const TextFooter_Background = style({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.color.white,
  bottom: '0',
  height: '108px',
  width: '100vw',
});
