import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const AnalyzeImage_Container = style({
  position: 'fixed',
  bottom: '0',
  width: '100%',
  height: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px 20px 0 0',
  background: theme.color.white,
  transition: 'all 0.3s ease',
  zIndex: '100',
  boxShadow: '0 -2px 0 0 black',
});

export const AnalyzeImage_AnalyzerContainerMove = styleVariants({
  analyze: {
    height: '25%',
  },
  success: {
    height: '70%',
  },
});
