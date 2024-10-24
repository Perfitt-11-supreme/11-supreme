import { style } from '@vanilla-extract/css';
import { select_arrow20 } from '../../../assets/assets';
import { theme } from '../../../styles/theme';

export const dateSelectBox = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  // gap: '4px',
  gap: '8px',
});
export const dateSelectLabel = style({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17px',
  letterSpacing: '-0.003em',
  userSelect: 'none',
});
export const dateSelectHorizon = style({
  display: 'flex',
  // gap: '4px',
  gap: '8px',
});
export const dateSelect = style({
  appearance: 'none',
  width: '100%',
  // height: '45px',
  // padding: '12.5px 10px',
  height: '48px',
  padding: '14px 16px',
  display: 'flex',
  color: theme.color.cool_gray400,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  backgroundColor: theme.color.white,
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '4px',
  backgroundImage: `url(${select_arrow20})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'calc(100% - 10px) 12.5px',
  backgroundSize: 'auto 20px',
  transition: 'all 0.2s ease-out',
  cursor: 'pointer',
  ':focus': {
    outlineColor: theme.color.ai_blue500,
  },
});
