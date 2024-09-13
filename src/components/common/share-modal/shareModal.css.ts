import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const shareWrap = style({
  width: '100%',
  height: '100%',
  backgroundColor:'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: "center",
  alignItems: 'center',
  position: 'absolute',
  top:'0',
  zIndex:99999
})
export const shareContainer = style({
  width: '320px',
  padding: '16px',
  borderRadius: '16px',
  backgroundColor: theme.color.white,
  display: 'flex',
  flexDirection: 'column',
  gap:'20px'
})
export const shareTextWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap:"8px"
})
export const shareTitle = style({
  fontSize: '18px',
  lineHeight: '28px',
  fontWeight: 800,
  letterSpacing: '-0.16px'
})
export const shareDescription = style({
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '-0.042px',
  color:'#52525B'
})
export const shareContentsBox = style({
  width: "100%",
  backgroundColor: "#FAFAFA",
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '8px',
  padding: '16px',
  display: 'flex',
  flexDirection:'column',
  gap:'8px'
})
export const shareContentsTitle = style({
  fontWeight: 600,
  color: '#18181B',
  lineHeight: '20px',
  letterSpacing:'-0.048px'
  
})
export const shareDate = style({
  fontSize: '14px',
  lineHeight: "22px",
  letterSpacing: '-0.042px',
  color:'#52525B'
})
export const shareModalButton = style({
  width: '100%',
  height: '44px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: theme.color.black,
  padding: '12px 0',
  color: theme.color.white,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});
export const copyingButton = style({
  width: '100%',
  height: '44px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: '#F5F5F5',
  padding: '12px 0',
  color: theme.color.cool_gray400,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});

