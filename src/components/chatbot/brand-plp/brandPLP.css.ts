import { style } from '@vanilla-extract/css';
export const brandPlpWrap = style({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection:'column'
})

export const brandPlpNameContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems:'center',
  margin: '16px 0',
  padding:'0 16px'
})

export const brandPlpBrandImage = style({
  width: '100%',
  height: 'auto',
  backgroundColor: 'red', 
})

export const brandPlpFilterButtonWrap = style({
  display: 'flex',
  gap:'5px',
  padding: '16px 16px 0'
})

