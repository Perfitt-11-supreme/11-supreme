import { style } from '@vanilla-extract/css';

export const chatBotWrap = style({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor:'black'
})

export const chatBotContainer = style({
  width: "375px",
  height:'812px',
  backgroundColor: "white",
  paddingTop: '34px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: "space-between",
  overflow:'hidden'
})

export const chatBubbleWrap = style({
  padding: '20px 16px 0',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflowY:'scroll'
  
})

export const chatBotCardWrap = style({
  paddingLeft: '12px',
})

export const chatBotModalWrap = style({
  position: 'relative',
})