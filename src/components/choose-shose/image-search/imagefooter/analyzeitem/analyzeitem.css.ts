import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../../../../styles/theme';

export const AnalyzeItem_Container = style({
  position: 'fixed',
  bottom: '0',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px 20px 0 0',
  background: theme.color.white,
  transition: 'all 0.3s ease',
  zIndex: '100',
});

export const AnalyzeItem_AnalyzerContainerMove = styleVariants({
  success: {
    height: '70vh',
  },
  gallery: {
    height: '40vh',
  },
  analyze: {
    height: '25vh',
  },
  hidden: {
    height: '0',
    transform: 'translateY(200px)',
  },
});
