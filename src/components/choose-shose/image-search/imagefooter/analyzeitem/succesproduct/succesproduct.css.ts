import { style } from '@vanilla-extract/css';
import { theme } from '../../../../../../styles/theme';

export const Product_SuccesContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Product_AgainBox = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '10px',
  marginLeft: '36px',
  marginTop: '27px',
});

export const Product_AgainIcon = style({
  width: '17px',
  height: '16px',
});

export const Product_AgainText = style({
  fontWeight: '400',
  fontSize: '13px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
});

export const Product_Similar = style({
  display: 'flex',
  gap: '10px',
  background: theme.color.cool_gray600,
  width: '35vw',
  height: '32px',
  borderRadius: '4px',
  padding: '4px 10px',
  marginTop: '28px',
});

export const Product_SimilarText = style({
  color: theme.color.white,
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
});

export const Product_ProductImage = style({
  width: '92vw',
  height: '30%',
  marginTop: '35px',
});

export const Product_ProductInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '11px',
  width: '81vw',
  marginTop: '34px',
  marginBottom: '39px',
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
export const Product_ProductPrice = style({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  color: theme.color.black,
});

export const Product_SimilarProductContainer = style({
  width: '100%',
  height: '100%',
  paddingTop: '29px',
  paddingBottom: '108px',
});

export const Product_SimilarProductButton = style({
  width: '100%',
  height: '108px',
  position: 'fixed',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.color.white,
});
