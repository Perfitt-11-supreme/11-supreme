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
});
export const FilterProductsAndBrandsButtonBox = style({
  width: '100%',
});
export const FilterProductsAndBrandsButton = style({
  width: '50%',
});
export const LikedAndViewedHistoryItemBox = style({
  padding: '0 16px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
});
