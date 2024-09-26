import { style } from '@vanilla-extract/css';
import { media } from '../../styles/media.css';

export const toastContainer = style([
  {
    position: 'fixed',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    zIndex: 10000,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    opacity: 0,
    transition: 'opacity 1s ease-in-out',
  },
  media,
]);

export const showToast = style({
  opacity: 1,
});

export const toastMessage = style({
  margin: 0,
  fontSize: '14px',
});
