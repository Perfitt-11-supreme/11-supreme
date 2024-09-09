import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const SearchBox_Background = style({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  width: '100vw',
  height: '65px',
  top: '56px',
  background: theme.color.white,
  transition: 'transform 0.3s ease-in-out',
  zIndex: '100',
});

export const SearchBox_Container = style({
  display: 'flex',
  width: '90vw',
  height: '40px',
  background: theme.color.white,
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '30px',
});

export const SearchBox_Box = style({
  border: 'none',
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  color: theme.color.black,
  selectors: {
    '&::placeholder': {
      color: theme.color.cool_gray200,
    },
  },
  width: '90%',
  marginLeft: '11px',
  marginRight: '4px',
});

export const SearchBox_searchIcon = style({
  width: '15px',
  height: '15px',
  color: theme.color.black500,
  marginTop: '12px',
  marginBottom: '13px',
  marginLeft: '16px',
});

export const SearchBox_cameraIcon = style({
  width: '18px',
  height: '17px',
  color: theme.color.black500,
  marginTop: '11px',
  marginBottom: '12px',
  marginRight: '20px',
});

export const SearchBox_Hide = style({
  transform: 'translateY(-100%)',
});
