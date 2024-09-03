import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const footSizeCardContainer = style({
  width: "249px",
  height: '204px',
  borderRadius: '6px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection:'column',
})

export const footSizeCardTop = style({
  width: '100%',
  display: 'flex',
  flexDirection:'column',
  padding:'15px',
  background:`linear-gradient(135deg, ${theme.color.ai_blue500}, ${theme.color.ai_purple500}, ${theme.color.ai_red500})`
})

export const footSizeHeadingText = style({
  fontWeight: 600,
  fontSize: '16px',
  letterSpacing: '-0.003em',
  color:theme.color.white
})

export const footSizeSubText = style({
  fontSize: '12px',
  color:theme.color.white
})

export const footSizeBubbleIcon = style ({
  display: 'flex',
  justifyContent:'end'
})

export const footSizeCardBottom = style({
  borderLeft: `1px solid ${theme.color.cool_gray100}`,
  borderRight: `1px solid ${theme.color.cool_gray100}`,
  borderBottom: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '0 0 6px 6px',
  padding:'13px 0 8px 0'
})

export const footSizeText = style({
  padding: '0 12px 13px',
  color: theme.color.gray400,
  fontSize: '14px',
  letterSpacing: '-0.003em',
  lineHeight: '22px',
  display: 'flex',
  flexDirection:'column'
})

export const footSizeButtonContainer = style({
  padding: '0 8px 7px',
  cursor:'pointer'
})

export const footSizeButton = style({
  all: 'unset',
  width:'100%',
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: '10px',
  color: theme.color.black,
  padding:'5px 0'
})
