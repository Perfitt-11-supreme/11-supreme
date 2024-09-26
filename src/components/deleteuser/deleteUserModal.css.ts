import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const deleteButton = style({
  width: '100%',
  height: '44px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: theme.color.red800,
  padding: '12px 0',
  color: theme.color.white,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});

export const undoButton = style({
  width: '100%',
  height: '44px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: theme.color.black,
  padding: '12px 0',
  color: theme.color.white,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});
