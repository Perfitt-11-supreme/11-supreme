import { style } from '@vanilla-extract/css';

export const sliderContainer = style({
  width: '343px',
  textAlign: 'center',
  position: 'relative',
  margin: '12px 0 20px 0',
});

export const slider = style({
  width: '100%',
  height: '0px',
  position: 'relative',
  appearance: 'none',
  zIndex: 1,
  margin: 0,
  '::-webkit-slider-thumb': {
    appearance: 'none',
    width: '23px',
    height: '15px',
    background: 'black',
    cursor: 'pointer',
    borderRadius: '99px',
    border: '3px solid #3f3f46',
    transform: 'translateY(-75%)',
    zIndex: 2,
  },
  '::-moz-range-thumb': {
    appearance: 'none',
    width: '23px',
    height: '15px',
    background: 'black',
    cursor: 'pointer',
    borderRadius: '99px',
    border: '3px solid #3f3f46',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  },
});

export const track = style({
  width: '100%',
  height: '8px',
  background: '#e0e0e0',
  position: 'absolute',
  top: '8%',
  transform: 'translateY(-50%)',
  borderRadius: '2px',
  zIndex: 0,
});

export const dotContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  width: '315px',
  top: '8%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
});

export const dot = style({
  width: '10px',
  height: '10px',
  backgroundColor: 'white',
  borderRadius: '50%',
  border: '2px solid #d4d4d8',
  zIndex: 1,
});

export const labels = style({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  width: '343px',
});

export const label = style({
  display: 'block',
  width: '60px',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#a1a1aa',
});

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  border: 0,
});
