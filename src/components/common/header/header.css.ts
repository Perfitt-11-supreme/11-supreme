import { style } from '@vanilla-extract/css';

export const header = style({
  width: '375px',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
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
