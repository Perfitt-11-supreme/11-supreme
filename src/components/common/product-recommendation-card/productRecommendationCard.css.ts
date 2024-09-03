import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';
import { shoes_w159 } from '../../../assets/assets.css';

export const productRecommendationCardBox = style({
  width: '162px',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
});
export const productRecommendationThumbnail = style({
  width: '100%',
  height: '156px',
  borderRadius: '6.27px',
  backgroundColor: theme.color.gray100,
  position: 'relative',
  backgroundImage: `url(${shoes_w159})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center calc(100% - 23px)',
});

export const heartIconBox = style({
  position: 'absolute',
  top: '14px',
  right: '14px',
});
export const brandIconBox = style({
  position: 'absolute',
  right: '6px',
  bottom: '-9px',
});
export const productBox = style({
  width: '100%',
  height: '89px',
  padding: '6px 10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  border: `1px solid ${theme.color.gray100}`,
  borderTop: '0px',
  borderRadius: '0px 0px 6px 6px',
});
export const productName = style({ display: 'flex', flexDirection: 'column', gap: '3px' });
export const productBrand = style({
  width: 'auto',
  height: '18px',
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '18px',
});
export const productText = style({
  width: 'auto',
  height: '17px',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17px',
  letterSpacing: '-0.003em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
export const productPrice = style({
  width: 'auto',
  fontSize: '13px',
  fontWeight: '600',
  lineHeight: '15.51px',
});
