import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const IsLoading_Container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

export const IsLoading_Window = style({
  position: 'absolute',
  width: '124px',
  height: '124px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const IsLoading_Circle = style({
  position: 'absolute',
  width: '80px',
  height: '80px',
  border: '8px solid transparent',
  borderTopColor: theme.color.black150 /* 스피너 색상 */,
  borderRadius: '50%',
  marginBottom: '20px' /* 텍스트와의 간격 */,
});

export const IsLoading_Text = style({
  height: '24px',
  fontWeight: '400',
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
});

export const IsLoading_MarginTop = style({
  marginTop: '50%',
});
