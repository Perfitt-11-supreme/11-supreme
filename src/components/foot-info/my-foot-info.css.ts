import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100%',
  position: 'relative',
});

export const InfoDiv = style({
  width: '343px',
  border: '1px solid #e4e4e7',
  borderRadius: '16px',
  marginTop: '24px',
  boxShadow: '0px 10px 15px -3px #0000001A',
  overflow: 'hidden',
});

export const textButtonDiv = style({
  display: 'flex',
  width: '343px',
  padding: '16px',
  justifyContent: 'space-between',
});

export const InfoP = style({
  fontWeight: '800',
  fontSize: '20px',
  lineHeight: '30px',
  letterSpacing: '-0.003em',
});

export const textDiv = style({
  padding: '16px',
});

export const accordion = style({
  marginBottom: '10px',
});

export const accordionContent = style({
  maxHeight: '0',
  overflow: 'hidden',
  transition: 'max-height 0.3s ease-out',
});

export const activeAccordion = style({
  maxHeight: '670px',
});

export const accordionDiv = style({
  width: '343px',
  border: '1px solid #e4e4e7',
  borderRadius: '16px',
  margin: '24px 0 24px 0',
  boxShadow: '0px 10px 15px -3px #0000001A',
  overflow: 'hidden',
});

export const accordionButton = style({
  backgroundColor: 'transparent',
  border: 'none',
});
