import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const TextHeader_Container = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '6px',
  width: '100vw',
  height: '56px',
  marginTop: '34px',
});

export const TextHeader_Title = style({
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
  color: theme.color.black,
});

export const TextHeader_Frame = style({
  width: '92px',
  height: '44px',
  gap: '4px',
});
