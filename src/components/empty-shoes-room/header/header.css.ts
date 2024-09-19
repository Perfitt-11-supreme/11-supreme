import { style } from '@vanilla-extract/css';

export const headerDiv = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px',
  width: '100%',
  height: '56px',
});

export const frame = style({
  width: '92px',
  height: '44px',
  gap: '4px',
});

export const headerTitle = style({
  display: 'flex',
  fontWeight: '600',
  fontSize: '18px',
  lineHeight: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '179px',
  height: '24px',
  gap: '10px',
  letterSpacing: '-0.015em',
});

export const backButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '44px',
  height: '44px',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});
