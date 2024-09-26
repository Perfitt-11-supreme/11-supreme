import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100%',
  position: 'relative',
});

export const infoDiv = style({
  display: 'flex',
  width: '343px',
  padding: '8px 16px',
});

export const infoP = style({
  width: '100px',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  color: '#4b5563',
});

export const imgDiv = style({
  display: 'flex',
  width: '343px',
  height: '343px',
  borderRadius: '6px',
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
  overflow: 'hidden',
});

export const labelP = style({
  width: '56px',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  marginLeft: '40px',
});

export const starDiv = style({
  display: 'flex',
  width: '43px',
  marginRight: '36px',
});

export const ratingP = style({
  lineHeight: '36px',
  fontSize: '24px',
  fontWeight: 'bold',
});

export const brandP = style({
  fontSize: '13px',
  lineHeight: '15px',
  letterSpacing: '-0.003em',
  color: '#808080',
});

export const shoesP = style({
  fontSize: '15px',
  lineHeight: '15px',
  letterSpacing: '-0.003em',
  marginTop: '2px',
});

export const reviewDiv = style({
  width: '343px',
  padding: '8px 16px',
  marginTop: '20px',
});

export const reviewP = style({
  marginTop: '10px',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
});
