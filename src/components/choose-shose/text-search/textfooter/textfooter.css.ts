import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';
import { media } from '../../../../styles/media.css';

export const TextFooter_Background = style([
  {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.color.white,
    bottom: '0',
    height: '108px',
    padding: '0 5%',
    boxShadow: '0px -1px 4px 0px #00000026',
  },
  media,
]);
