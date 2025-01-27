import { style } from '@vanilla-extract/css';
import { select_arrow20 } from '../../../../assets/assets';
import { theme } from '../../../../styles/theme';

export const usualsizeSelectBox = style({
  display: 'flex',
  flexDirection: 'column',
  // gap: '4px',
  gap: '8px',
  // padding: '0 16px',
  width: '100%',
});

export const usualsizeLabel = style({
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '17px',
  letterSpacing: '-0.003em',
  userSelect: 'none',
});

export const usualsizeSelect = style({
  appearance: 'none',
  width: '100%',
  // height: '45px',
  // padding: '12.5px 10px',
  height: '48px',
  padding: '14px 16px',
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
  // backgroundPosition: 'calc(100% - 10px) center',
  // backgroundSize: 'auto 20px',
  backgroundPosition: 'calc(100% - 16px) 14px',
  backgroundSize: 'auto 24px',
  transition: 'all 0.2s ease-out',
  cursor: 'pointer',
  ':focus': {
    outlineColor: theme.color.ai_blue500,
  },
});
