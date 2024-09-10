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

export const AnalyzeItem_AnalyzeCircle = style({
  position: 'absolute',
});

export const AnalyzeItem_AnalyzeText = style({
  height: '24px',
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
});

export const AnalyzeItem_AnalyzerWindow = style({
  position: 'absolute',
  width: '124px',
  height: '124px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const AnalyzeItem_AnalyzerContainerMove = styleVariants({
  success: {
    height: '70vh',
    transform: 'translateY(0)',
  },
  analyze: {
    height: '25vh',
    transform: 'translateY(0)',
  },
  hidden: {
    height: '0',
    transform: 'translateY(200px)',
  },
});
