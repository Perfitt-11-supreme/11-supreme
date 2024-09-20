import { style } from '@vanilla-extract/css';
import { theme } from '../../styles/theme';

export const mypageContainer = style({
  width: '100%',
});
export const userProfileImageContainer = style({
  width: '100%',
  height: '80px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export const userProfileIconBox = style({
  width: '80px',
  height: '80px',
  position: 'relative',
  color: theme.color.gray400,
});
export const profileImageBox = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  overflow: 'hidden',
});
export const userProfileUploadIconBox = style({
  width: '20px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.white,
  borderRadius: '19.44px',
  boxShadow: `0px 0px 2.67px 0px ${theme.color.black}40`,
  cursor: 'pointer',
  position: 'absolute',
  right: '0',
  bottom: '0',
});
export const userProfileGreetingContainer = style({
  width: '100%',
  padding: '17px 0 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});
export const userProfileGreeting = style({
  fontSize: '15px',
  fontWeight: '400',
  lineHeight: '17.9px',
  letterSpacing: '-0.28px',
  textAlign: 'center',
});
export const userProfileName = style({
  fontSize: '20px',
  fontWeight: '300',
  lineHeight: '23.87px',
  letterSpacing: '-0.28px',
  textAlign: 'center',
});
export const userProfileNameTextBold = style({
  fontWeight: '500',
});
export const borderLine = style({
  margin: '0',
  backgroundColor: theme.color.gray100,
  height: '6px',
  border: 'none',
});
export const mypageButtonBox = style({
  width: '100%',
  height: '60px',
  display: 'flex',
});
export const mypageButton = style({
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  backgroundColor: theme.color.white,
  cursor: 'pointer',
  border: 'none',
  selectors: {
    '&:last-child': {
      borderLeft: `1px solid ${theme.color.gray100}`,
    },
  },
});
export const mypageButtonIcon = style({
  marginBottom: '1.5px',
});

export const myInfoContainer = style({
  width: '100%',
  padding: '25px 16px',
});
export const myInfoTitle = style({
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '16.71px',
  marginBottom: '15px',
});
export const myInfoBox = style({
  display: 'flex',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '16.71px',
});
// 공통 스타일 정의
const baseMyInfoKeyValue = style({
  width: '100%',
  height: '116px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});
export const myInfoKey = style([
  baseMyInfoKeyValue,
  {
    width: '133px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '16.71px',
    color: theme.color.black500,
  },
]);
export const myInfoValue = style([
  baseMyInfoKeyValue,
  {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '16.71px',
  },
]);

export const myInfoServiceBox = style({
  paddingTop: '25px',
});
export const myInfoServiceButton = style({
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '16.71px',
  backgroundColor: theme.color.white,
  borderBottom: `1px solid ${theme.color.cool_gray100}`,
  cursor: 'pointer',
});
export const myInfoServiceTermBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '36px',
  padding: '39px 0 51px',
});
export const myInfoServiceTermButton = style({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '16.71px',
  textAlign: 'center',
  cursor: 'pointer',
  color: theme.color.gray400,
});
