import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const chatbotSearchContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: theme.color.gray100,
  width: '375px',
  height: '104px',
  padding: '16px 16px 40px 16px',
  position: 'relative',
  zIndex:101
});

export const pictureIconBox = style({
  cursor: 'pointer',
});

export const chatbotSearchInputBox = style({
  width: '311px',
  height: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  backgroundColor: theme.color.white,
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '99px',
  position: 'relative',
});

export const chatbotSearchInput = style({
  width: '100%',
  height: '100%',
  paddingLeft: '16px',
  paddingRight: '56px',
  color: theme.color.cool_gray600,
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  borderRadius: '99px',
  border: 'none',
  transition: 'all 0.2s ease-out',
  ':focus': {
    outlineColor: theme.color.ai_blue500,
  },
});

export const uploadIconBox = style({
  cursor: 'pointer',
  position: 'absolute',
  right: '4px',
  background: 'none', /* 배경 없음 */
  border: 'none', /* 테두리 없음 */
  padding: 0, /* 패딩 없음 */
  margin: 0, /* 마진 없음 */
  font: 'inherit', /* 상속된 폰트 사용 */
  color: 'inherit', /* 상속된 텍스트 색상 사용 */
  outline: 'none', /* 포커스 아웃라인 없음 */
});
