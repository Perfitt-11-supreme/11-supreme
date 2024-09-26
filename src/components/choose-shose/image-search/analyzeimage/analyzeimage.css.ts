import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';
import { media } from '../../../../styles/media.css';

export const AnalyzeImage_Container = style([
  {
    position: 'fixed',
    bottom: '0',
    height: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px 20px 0 0',
    background: theme.color.white,
    transition: 'all 0.3s ease',
    zIndex: '100',
    boxShadow: '0px -1px 4px 0px #00000026',
  },
  media,
]);

export const AnalyzeImage_AnalyzerContainerMove = styleVariants({
  analyze: {
    height: 'calc(100% - 56px)',
    maxHeight: '200px',
  },
  success: {
    height: 'calc(100% - 56px)',
  },
});

export const AnalyzeImage_Button = style([
  {
    position: 'fixed',
    backgroundColor: theme.color.white,
    height: '108px',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media,
]);
