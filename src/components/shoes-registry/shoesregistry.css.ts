import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',
  position: 'relative',
});

export const descP = style({
  width: '100%',
  padding: '6px 0 0 16px',
  fontWeight: 'bold',
  fontSize: '15px',
  lineHeight: '18px',
});

export const imagePlusButton = style({
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#f5f5f5',
  width: '343px',
  height: '48px',
  cursor: 'pointer',
  display: 'ruby',
  marginTop: '11px',
});

export const imagePlusButtonSelected = style({
  border: 'none',
  backgroundColor: 'white',
  height: '77px',
});

export const itemCardDiv = style({
  display: 'flex',
  textAlign: 'start',
});

export const questionP = style({
  fontSize: '18px',
  fontWeight: '600',
  letterSpacing: '-0.002em',
  marginTop: '41px',
  lineHeight: '30px',
});

export const starP = style({
  fontSize: '12px',
  marginTop: '6px',
  lineHeight: '18px',
});

export const questP = style({
  padding: '8px 16px',
  width: '100%',
  fontSize: '15px',
  fontWeight: 'bold',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
});

export const area = style({
  width: '343px',
  height: '200px',
  border: '1px solid #e4e4e7',
  borderRadius: '6px',
  fontSize: '15px',
  padding: '16px',
  margin: '6px 0 20px 0',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
});

export const buttonDiv = style({
  marginBottom: '34px',
});

export const errorText = style({
  width: '343px',
  color: 'red',
  fontSize: '12px',
});
