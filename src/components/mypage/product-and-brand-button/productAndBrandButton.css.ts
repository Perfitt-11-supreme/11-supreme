import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const filterProductAndBrandButtonBox = style({
  marginTop: '39px',
  display: 'flex',
  gap: '5px',
  padding: '0 16px',
});
const baseFilterProductAndBrandButton = style({
  height: '32px',
  borderRadius: '99px',
  padding: '4px 12px',
  fontWeight: '800',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  textAlign: 'center',
  cursor: 'pointer',
});
export const filterProductAndBrand = style([
  baseFilterProductAndBrandButton,
  {
    backgroundColor: theme.color.white,
    border: `1px solid ${theme.color.cool_gray100}`,
  },
]);
export const filterProductAndBrandChecked = style([
  baseFilterProductAndBrandButton,
  {
    color: theme.color.white,
    backgroundColor: theme.color.black,
    border: `1px solid ${theme.color.black}`,
  },
]);
