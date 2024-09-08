import { style } from '@vanilla-extract/css';

export const bubbleContainer = style({
  width: '56px',
  height: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'center',
  position: 'absolute',
  zIndex: 1,
  borderRadius:'8px',
  backgroundColor: '#18181B',
  border: '1px solid #3F3F46',
  padding: '4px 12px',
  boxShadow:'0 1px 3px rgba(0,0,0,0.06)'
});

export const bubbleContent = style({
  width: '6px',
  height: '6px',
  backgroundColor: '#18181B',
  borderTopRightRadius:'2px',
  borderTop: "1px solid #3F3F46",
  borderRight:"1px solid #3F3F46",
  transform: 'rotate(135deg)',
  position: 'absolute',
  bottom: '-3.5px',
  zIndex: 2,
});

export const bubbleText = style({
  color: '#fff',
  fontSize: '24px',
  fontWeight: 'bold',
});