import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const filterButton = style({
  width: 'auto',
  height: '32px',
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '99px',
  padding: '4px 12px',
  color: theme.color.slate600,
  display: 'flex',
  justifyContent: "center",
  alignItems: 'center',
  backgroundColor: theme.color.white,
  cursor:'pointer'
})

export const filterButtonActive = style({
  backgroundColor: theme.color.black,
  color: 'white',
  fontWeight: 800,
  letterSpacing:'-0.003em'

});