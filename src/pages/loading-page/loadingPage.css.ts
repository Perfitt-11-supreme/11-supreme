import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const loadingWrap = style({
  display: "flex",
  justifyContent: "center",
  height: "100vh", /* 전체 화면 중앙 정렬 */
  backgroundColor:theme.color.black

})

export const loadingContainer = style({
  width: '375px',
  height:'812px',
  backgroundColor: theme.color.white,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
})
export const loading = style({
  width: '80px',
  height: '80px',
  border: '8px solid transparent',
  borderTopColor: theme.color.black150, /* 스피너 색상 */
  borderRadius: '50%',
  marginBottom: '20px', /* 텍스트와의 간격 */
})
export const loadingText = style({
  color: theme.color.black900,
  fontSize: '16px',
  textTransform: 'uppercase',
})