import { style } from '@vanilla-extract/css';

export const likedAndViewedHistoryCointainer = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflowY: 'hidden',
});

export const filterProductsAndBrandsQuantityBox = style({ padding: '0 21px' });
export const filterProductsAndBrandsQuantity = style({
  padding: '17px 0 15px',
  fontWeight: '800',
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '-0.003em',
});
export const likedAndViewedHistoryItemBox = style({
  padding: '0 16px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  paddingBottom: '64px',
  overflowY: 'auto',
  height: 'calc(100% - 180px)',
});
export const likedInBrandsItemBox = style({
  padding: '0 16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  gap: '16px',
  paddingBottom: '64px',
  overflowY: 'auto',
  height: 'calc(100% - 180px)',
});
