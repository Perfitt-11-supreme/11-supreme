import { style } from '@vanilla-extract/css';
import { theme } from '../../../../styles/theme';

export const MainContainter_Background = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '65px',
  marginBottom: '108px',
});

export const MainContainer_Container = style({
  width: '100%',
});

export const MainContainer_Header = style({
  margin: '0 7%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const MainContainer_RecentSearches = style({
  height: '21px',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '21.48px',
  color: theme.color.black,
});

export const MainContainer_Remove = style({
  display: 'flex',
  height: '19px',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '16.71px',
  alignItems: 'center',
  color: theme.color.gray500,
  paddingTop: '2px',
  cursor: 'pointer',
});

export const MainContainer_NoRecord = style({
  display: 'flex',
  // width: '132px',
  height: '17px',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '16.71px',
  alignContent: 'center',
  justifyContent: 'center',
  marginTop: '31px',
  color: theme.color.gray300,
  // margin: '31px 121px 0 122px',
});

export const MainContainer_RecentRecord = style({
  height: '24px',
  margin: '0 7%',
  marginTop: '10px',
  fontWeight: '400',
  fontSize: '15px',
  color: theme.color.gray300,
  cursor: 'pointer',
});

export const MainContainer_Line = style({
  width: '100%',
  height: '6px',
  marginTop: '31px',
  background: theme.color.gray100,
});
