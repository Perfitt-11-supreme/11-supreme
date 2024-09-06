import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const LikedAndViewedHistoryCointainer = style({
  width: '375px',
  height: '812px',
});
export const LikedAndViewedHistoryButtonBox = style({
  width: '100%',
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
});
export const FilterProductsAndBrandsButtonBox = style({
  width: '100%',
});
export const FilterProductsAndBrandsButton = style({});
export const LikedAndViewedHistoryItemBox = style({
  padding: '0 16px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
});
