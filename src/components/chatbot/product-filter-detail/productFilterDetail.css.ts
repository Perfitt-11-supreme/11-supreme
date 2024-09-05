import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const filterDetailContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding:'0 16px'
});

export const filterDetailCategoryTitle = style({
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '-0.003em',
  marginBottom: '10px',
});

export const filterDetailButtonContainer = style({
  display: 'flex',
  gap: '5px',
  marginBottom:'20px'
});

export const priceFilterContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const priceLabel = style({
  fontSize: '16px',
  fontWeight: 'bold',
});

export const rangeContainer = style({
  position: 'relative',
  height: '20px',
});

export const rangeInput = style({
  position: 'absolute',
  width: '100%',
  pointerEvents: 'none',
  appearance: 'none',
  background: 'transparent',
  outline: 'none',

  '::-webkit-slider-thumb': {
    pointerEvents: 'auto',
    appearance: 'none',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: theme.color.white,
    border: `2px solid ${theme.color.cool_gray900}`,
    cursor: 'pointer',
  },

  '::-moz-range-thumb': {
    pointerEvents: 'auto',
    appearance: 'none',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: theme.color.white,
    border: `2px solid ${theme.color.cool_gray900}`,
    cursor: 'pointer',
  },

  '::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: '2px',
    background: theme.color.cool_gray900,
    transform: 'translateY(-50%)',
    zIndex: -1,
  },
});

export const priceFilterPriceDisplay = style({
  fontSize: '14px',
  color: theme.color.cool_gray400,
  letterSpacing: '-0.003em',
  display: 'flex',
  justifyContent: 'end',
  marginBottom:"40px"
});