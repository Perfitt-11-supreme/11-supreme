import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const sizeRecommendationCardBox = style({
  width: 'auto',
  minWidth: '166px',
  height: '277px',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
});
export const sizeRecommendationThumbnail = style({
  width: '100%',
  height: '156px',
  borderRadius: '6.27px',
  backgroundColor: theme.color.gray100,
  position: 'relative',
});

export const sizeRecommendationThumbnailContainer = style({
  width: '100%',
  height: '156px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopLeftRadius: '6.27px',
  borderTopRightRadius: '6.27px',
  overflow: 'hidden',
  position: 'relative',
});

export const imageStyle = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const sizeRecommendationBadge = style({
  // width: '77px', 사이즈추천 기능 미구현 이슈
  width: '37px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  padding: '5px',
  background: `linear-gradient(90deg, ${theme.color.pastel_blue100} 0%, ${theme.color.pastel_pink100} 100%)`,
  position: 'absolute',
  top: '8px',
  left: '10px',
});
export const sizeRecommendationBadgeTag = style({
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '16px',
  color: 'transparent',
  background: `linear-gradient(90deg, ${theme.color.ai_blue500} 0%, ${theme.color.ai_purple500} 50%,${theme.color.ai_red500}  100%)`, // 그라데이션 배경
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const heartIconBox = style({
  position: 'absolute',
  top: '11px',
  right: '10px',
});
export const brandIconBox = style({
  cursor: 'pointer',
  position: 'absolute',
  right: '6px',
  bottom: '-12px',
});
export const productBox = style({
  width: '100%',
  height: '89px',
  padding: '10px 6px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});
export const productName = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
});
export const productBrand = style({
  width: 'auto',
  height: '22px',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '22px',
  letterSpacing: '-0.003em',
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

export const productDetailsButton = style({
  width: '100%',
  height: '32px',
  padding: '8px 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  fontSize: '10px',
  fontWeight: '600',
  lineHeight: '16px',
  backgroundColor: theme.color.white,
  border: `0.58px solid ${theme.color.cool_gray100}`,
  borderRadius: '6px',
  cursor: 'pointer',
});
