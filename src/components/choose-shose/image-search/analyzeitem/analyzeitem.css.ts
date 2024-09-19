import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const AnalyzeItem_Container = style({
  position: 'fixed',
  bottom: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px 20px 0 0',
  borderTop: '1px solid black',
  background: theme.color.white,
  transition: 'all 0.3s ease',
  zIndex: '100',
});

export const AnalyzeItem_AnalyzerContainerMove = styleVariants({
  hidden: {
    height: '0',
    transform: 'translateY(200px)',
  },
  analyze: {
    height: '25%',
    transform: 'translateY(0)',
  },
  success: {
    height: '70%',
    transform: 'translateY(0)',
  },
});
