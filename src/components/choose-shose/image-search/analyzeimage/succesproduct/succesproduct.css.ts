import { style } from '@vanilla-extract/css';
import { theme } from '../../../../../styles/theme';

export const Product_SuccesContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  paddingBottom: '108px',
});

export const Product_Similar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  background: theme.color.cool_gray600,
  width: '37%',
  height: '32px',
  borderRadius: '4px',
  padding: '4px 10px',
  margin: '28px 0',
});

export const Product_SimilarText = style({
  color: theme.color.white,
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  cursor: 'pointer',
});

export const Product_ProductImage = style({
  width: '70%',
});

export const Product_ProductInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '11px',
  width: '70%',
  marginTop: '7%',
  marginBottom: '7%',
});

export const Product_ProductBrand = style({
  fontWeight: '600',
  fontSize: '18px',
  lineHeight: '24px',
  letterSpacing: '-0.015em',
  color: theme.color.black,
});

export const Product_ProductName = style({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  color: theme.color.black,
});
