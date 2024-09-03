import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { theme } from './styles/theme';

const Pretendard = 'PretendardVariable';

globalFontFace('PretendardVariable', {
  src: `url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/PretendardVariable.woff2') format('woff')`,
  fontWeight: '45 920',
  fontStyle: 'normal',
});

globalStyle('html', {
  MozTextSizeAdjust: 'none',
  WebkitTextSizeAdjust: 'none',
  textSizeAdjust: 'none',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('h1,h2,h3,h4,p,figure,blockquote,dl,dd', {
  marginBlockEnd: 0,
  quotes: 'none',
});

globalStyle('blockquote:before, blockquote:after,q:before, q:after', {
  content: 'none',
});

globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

globalStyle('ul,li,ol', {
  listStyle: 'none',
});

globalStyle('body', {
  minHeight: '100vh',
  lineHeight: '1',
});

globalStyle('h1,h2,h3,h4,button,input,label', {
  lineHeight: '1.1',
});

globalStyle('h1,h2,h3,h4,b', {
  textWrap: 'balance',
  color: theme.color.black,
});

globalStyle('a:not([class])', {
  textDecorationSkipInk: 'auto',
  color: 'currentcolor',
});

globalStyle('img,picture', {
  maxWidth: '100%',
  display: 'block',
});

globalStyle('input,button,textarea,select', {
  font: Pretendard,
});

globalStyle('textarea:not([row])', {
  minHeight: '10em',
});

globalStyle(
  'html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary,time, mark, audio, video',
  {
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: '100%',
    font: 'inherit',
    fontFamily: Pretendard,
    verticalAlign: 'baseline',
  }
);

globalStyle('article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section', {
  display: 'block',
});
