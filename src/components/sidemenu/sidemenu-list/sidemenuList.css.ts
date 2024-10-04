import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const sidemenuListContainer = style({
  width: '100%',
  height: '34px',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden', // 리스트가 컨테이너 밖으로 나가면 감춤
});

export const sidemenuListBox = style({
  width: '258px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'transform 0.3s ease', // 스와이프 시 이동 애니메이션
});

export const sidemenuListIcon = style({
  marginBottom: '2px',
});

export const sidemenuListText = style({
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  color: theme.color.black800,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const sidemenuSwiperHiddenBox = style({
  display: 'flex',
  position: 'absolute',
  right: '0',
  height: '100%',
  transform: 'translateX(100%)', // 기본적으로 숨김
  transition: 'transform 0.3s ease', // 애니메이션 추가
});

export const sidemenuLinkShareIconBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '45px',
  height: '34px',
  backgroundColor: theme.color.cool_gray400,
  border: 'none',
  cursor: 'pointer',
});

export const sidemenuDeleteIconBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '45px',
  height: '34px',
  backgroundColor: theme.color.red400,
  border: 'none',
  cursor: 'pointer',
});
