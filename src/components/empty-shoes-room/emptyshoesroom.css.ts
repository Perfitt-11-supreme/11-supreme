import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minHeight: '812px',
  height: '100%',
  position: 'relative',
});

export const noShoesDiv = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const buttonDiv = style({
  bottom: '37px',
  position: 'absolute',
  left: '16px',
});

export const countp = style({
  fontSize: '14px',
  lineHeight: '17px',
});

export const optiondiv = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '90%',
  alignItems: 'center',
  margin: '29px 0 5px 20px',
});

export const select = style({
  color: 'grey',
  border: 'none',
  appearance: 'none',
  backgroundImage: 'url(../../assets/empty-shoes-room/select.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right center',
  backgroundColor: 'transparent',
  width: '51px',
  height: '17px',
  fontWeight: '500',
  fontSize: '14px',
});

export const shoesdiv = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 3개의 열
  gap: '2px',
  margin: '0 16px',
});

export const imageplusbutton = style({
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#e4e4e7',
  width: '100%',
  height: '110px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const imagebutton = style({
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#f5f5f5',
  width: '100%',
  height: '110px',
  overflow: 'hidden',
  cursor: 'pointer',
});

export const buttonImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // 이미지를 버튼에 맞게 자르고 크기 조정
});

export const fontBold = style({
  fontWeight: 'bold',
});

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  border: 0,
});
