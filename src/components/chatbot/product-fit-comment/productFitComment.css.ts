import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const fitCommentWrap = style({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
})

export const fitCommentHeader = style({
  padding:'16px 0 8px'
})

export const fitCommentProductContainer = style({
  display: 'flex',
  marginBottom:'16px'
})

export const fitCommentProductImage = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems:'center',
  width: '100px',
  height: '100px',
  borderRadius:"8px",
  backgroundColor: theme.color.gray100,
})

export const fitCommentProductTextContainer = style({
  display: 'flex',
  gap: '6px',
  flexDirection: 'column',
  marginLeft: '12px',
  letterSpacing: '-0.24px',
  fontSize: '18px'
})

export const fitCommentAIContainer = style({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.color.cool_gray100}`,
  borderRadius: '8px',
  marginBottom:'18px'
})

export const fitCommentAItextContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection:'column',
  gap: '8px',
  borderBottom: `1px solid ${theme.color.cool_gray100}`,
})

export const fitCommentAItext = style({
  fontWeight: 600,
  background: `linear-gradient(to right, ${theme.color.ai_blue500}, ${theme.color.ai_purple500}, ${theme.color.ai_red500})`,
  WebkitBackgroundClip: 'text', // Webkit 기반 브라우저에서 텍스트에 배경을 적용
  WebkitTextFillColor: 'transparent', // 텍스트 색상을 투명하게 설정
  backgroundClip: 'text', // 텍스트에만 그라데이션이 적용되도록 설정
  color: 'transparent', // 텍스트 색상을 투명하게 설정
})

export const fitCommentAIResult = style({
  fontWeight: 600,
  letterSpacing: '-0.003px',
  marginBottom:'8px'
})

export const fitCommentSliderContainer = style({
  width: '100%',
  maxWidth: '400px',
  padding: '20px 10px',
});

export const fitCommentTooltipContainer = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom:'8px'
})

export const fitCommentSliderTooltipContainer = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

})

export const bubbleContainer = style({
  width: '56px',
  height: '30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'center',
  position: 'relative',
  zIndex: 1,
  borderRadius:'8px',
  backgroundColor: '#18181B',
  border: '1px solid #3F3F46',
  padding: '4px 12px',
  boxShadow:'0 1px 3px rgba(0,0,0,0.06)'
});

export const bubbleContent = style({
  width: '6px',
  height: '6px',
  backgroundColor: '#18181B',
  borderTopRightRadius:'2px',
  borderTop: "1px solid #3F3F46",
  borderRight:"1px solid #3F3F46",
  transform: 'rotate(135deg)',
  position: 'absolute',
  bottom: '-3.5px',
  zIndex: 2,
});

export const bubbleText = style({
  color: '#fff',
  fontSize: '24px',
  fontWeight: 'bold',
});

export const fitCommentSliderTooltipWrap = style({
  width: '100%',
  height:'20px'
})
export const fitCommentSliderTooltip = style({
  position:'absolute'
})

export const fitCommentSliderResult = style({
  color: theme.color.white,
  position: 'absolute',
  top: '-12px',
  fontSize:'14px'
})

export const fitCommentSliderWrap = style({
  width: '100%',
});

export const fitCommentSlider = style({
  width: '100%',
  height: '18px',
  padding: '5px 8px',
  borderRadius: '99px',
  background: 'linear-gradient(to right, #FFA1D8, #FFC7FC, #FAFAFA, #A6D7FF, #7AD1FF)',
  outline: 'none',
  opacity: '0.7',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position:'relative'
  
});

export const fitCommentSliderThumbs = style({
  width: '8px',
  height: '20px',
  borderRadius: '99px',
  background: 'white',
  border: `1px solid ${theme.color.cool_gray400}`,
  cursor: 'pointer',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
  
})

export const fitCommentSliderDotContainer = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 8px',
  position: 'absolute',
  zIndex:'-1'
});



export const fitCommentSliderDot = style({
  width: '8px',
  height:'8px',
  borderRadius: '100%',
  backgroundColor: theme.color.white,
});

export const fitCommentSliderLabels = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '8px',
  fontSize: '14px',
  color: '#3F3F46',
});


export const fitCommentDescription = style({
  padding: '16px',
  letterSpacing: '-0.003px',
  color: '#18181B',
  backgroundColor: '#FAFAFA',
  borderRadius: '8px',
  lineHeight:'24px'
})
// export const fitCommentWrap = style({

// })
// export const fitCommentWrap = style({

// })