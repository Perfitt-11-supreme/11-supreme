import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const TextHeader_Container = style({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  top: '34px',
  left: '0',
  right: '0',
  width: '100vw',
  height: '56px',
  background: theme.color.white,
  padding: '6px',
  zIndex: '1000',
});

export const TextHeader_Title = style({
  display: 'flex',
  fontWeight: '600',
  fontSize: '18px',
  lineHeight: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50vh',
  height: '44px',
  gap: '10px',
  letterSpacing: '-0.015em',
  color: theme.color.black,
  zIndex: '1000',
});

export const TextHeader_Frame = style({
  display: 'flex',
  width: '25vh',
  height: '44px',
  gap: '4px',
});

export const TextHeader_TouchBox = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  height: '100%',
});
