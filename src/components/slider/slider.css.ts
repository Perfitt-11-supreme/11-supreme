import { style } from '@vanilla-extract/css';

export const sliderContainer = style({
  width: '343px',
  textAlign: 'center',
  position: 'relative',
  marginBottom: '20px',
});

export const slider = style({
  width: '100%',
  height: '8px',
  position: 'absolute',
  borderRadius: '2px',
  left: 0,
  appearance: 'none',
  background: '#f5f5f5',
  outline: 'none',
  transition: 'opacity .2s',
  zIndex: 0,
  margin: 0,
  '::-webkit-slider-thumb': {
    appearance: 'none',
    width: '20px',
    height: '12px',
    background: 'black',
    cursor: 'pointer',
    borderRadius: '4px',
    zIndex: 2,
  },
  '::-moz-range-thumb': {
    width: '20px',
    height: '12px',
    background: 'black',
    cursor: 'pointer',
    borderRadius: '4px',
    zIndex: 2,
  },
});

export const labels = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '0.5rem',
  position: 'relative',
  width: '343px',
});

export const label = style({
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#a1a1aa',
});

// export const dot = style({
//   position: 'absolute',
//   width: '8px',
//   height: '8px',
//   background: '#000',
//   borderRadius: '50%',
//   top: '-8px',
//   transform: 'translateX(-50%)',
//   zIndex: 1,
// });
