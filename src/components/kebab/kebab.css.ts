import { style } from '@vanilla-extract/css';

export const menuContainer = style({
  position: 'relative',
  display: 'inline-block',
});

export const kebabButton = style({
  marginLeft: '48px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '10px',
});

export const dropdownMenu = style({
  width: '109px',
  position: 'absolute',
  top: '100%',
  right: '16px',
  backgroundColor: '#fff',
  boxShadow: '0px 1px 4px 0px #00000040',
  borderRadius: '10px',
  zIndex: 1000,
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(-10px)',
  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
});

export const dropdownMenuVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
  pointerEvents: 'auto',
});

export const menuItem = style({
  borderBottom: '1px solid #ddd',
  height: '40px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const menuItemText = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  lineHeight: '15.5px',
  letterSpacing: '-0.0028em',
});

export const deleteItem = style({
  color: 'red',
});
