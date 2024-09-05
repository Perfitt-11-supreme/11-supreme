import { style } from '@vanilla-extract/css';

export const radioform = style({
  display: 'flex',
  gap: '4px',
  textAlign: 'center',
});

export const radio = style({
  display: 'none',
});

// 라벨을 버튼처럼
export const radioButton = style({
  width: '53px',
  height: '32px',
  display: 'inline-block',
  borderRadius: '99px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '800',
  textAlign: 'center',
  color: '#000',
  alignContent: 'center',
  border: '1px solid #e5e7eb',
});

export const radioChecked = style({
  color: 'white',
  backgroundColor: 'black',
  border: 'none',
});
