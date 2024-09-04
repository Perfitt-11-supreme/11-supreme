import { style } from '@vanilla-extract/css';

export const radioform = style({
  display: 'flex',
  gap: '4px',
  width: '343px',
  textAlign: 'center',
  paddingBottom: '20px',
});

export const radio = style({
  display: 'none',
});

// 라벨을 버튼처럼
export const radioButton = style({
  display: 'inline-block',
  borderRadius: '4px',
  backgroundColor: '#f5f5f5',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  textAlign: 'center',
  color: '#a1a1aa',
  width: '112px',
  height: '37px',
  alignContent: 'center',
});

export const radioChecked = style({
  color: 'black',
  backgroundColor: 'white',
  border: '1px solid #f5f5f5',
});
