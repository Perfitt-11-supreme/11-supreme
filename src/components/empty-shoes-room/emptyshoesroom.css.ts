import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minHeight: '100vh',
  position: 'relative',
});

export const noShoesDiv = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const buttonDiv = style({
  bottom: '37px',
  position: 'absolute',
  left: '16px',
});
