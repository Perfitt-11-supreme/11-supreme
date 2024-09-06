import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const LikedAndViewedHistoryCointainer = style({
  width: '375px',
  height: '812px',
  position: 'relative',
});
export const LikedAndViewedHistoryButtonBox = style({
  width: '100%',
  position: 'absolute',
  top: '36.5px',
});
export const LikedAndViewedHistoryButton = style({
  width: '50%',
  height: '40px',
  backgroundColor: theme.color.white,
  border: 'none',
  padding: '0',
  fontWeight: '800',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  textAlign: 'center',
  borderBottom: `1px solid  ${theme.color.slate200}`,
  cursor: 'pointer',
});
export const FilterProductsAndBrandsButtonBox = style({
  marginTop: '39px',
  display: 'flex',
  gap: '5px',
  padding: '0 16px',
});
export const FilterProductsAndBrandsButton = style({
  height: '32px',
  borderRadius: '99px',
  padding: '4px 12px',
  fontWeight: '800',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  textAlign: 'center',
  color: theme.color.white,
  backgroundColor: theme.color.black,
  border: `1px solid ${theme.color.black}`,
  cursor: 'pointer',
});
export const FilterProductsAndBrandsQuantityBox = style({ padding: '0 16px' });
export const FilterProductsAndBrandsQuantity = style({});
export const LikedAndViewedHistoryItemBox = style({
  padding: '0 16px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
});
