import { motion } from 'framer-motion';
import { bar } from '../../../assets/assets';
import useModalStore from '../../../stores/useModalStore';
import { barBox, modalContainer, modalContainerTitle, modalContainerWrapper } from './modal.css';

type TModal = {
  title?: string;
  height: string;
  initialHeight?: string;
  children?: React.ReactNode;
  animateHeightOnClick?: boolean;
  //height 변화에 클릭 필요 여부 (true: 클릭 시에만 변화, false: 실시간 변화)
};

const Modal = ({
  title,
  height,
  children,
  initialHeight,
  animateHeightOnClick = true, //디폴트: 클릭 시에만 변화
}: TModal) => {
  const { isOpen, setIsOpen } = useModalStore();

  const handleModalClick = () => {
    if (title !== '관심 키워드') {
      setIsOpen(!isOpen);
    }
  };

  const isInterestKeyword = title === '관심 키워드';

  return (
    <>
      <div className={modalContainerWrapper}>
        {isInterestKeyword ? (
          <div className={modalContainer} style={{ height: height }}>
            <div className={barBox} />

            {title && <h1 className={modalContainerTitle}>{title}</h1>}
            {children}
          </div>
        ) : (
          <motion.div
            className={modalContainer}
            initial={{ height: initialHeight }}
            animate={{ height: isOpen || !animateHeightOnClick ? height : initialHeight }}
            //열려 있을 때 or 실시간 변화일 때: height, 클릭 시에만 변화일 때이고 닫혀 있을 때: initialheight
            transition={{ duration: 0.5 }}
          >
            <div
              className={barBox}
              onClick={animateHeightOnClick ? handleModalClick : undefined}
              //클릭 시에만 변화일 때: 열거나 닫거나 이벤트 핸들러 실행, 실시간 변화일 때: 정의 X
              style={{
                cursor: animateHeightOnClick ? 'pointer' : 'default',
                pointerEvents: animateHeightOnClick ? 'auto' : 'none',
                //실시간 변화일 때 클릭 아예 차단
              }}
            >
              <img src={bar} alt="bar" />
            </div>
            {title && <h1 className={modalContainerTitle}>{title}</h1>}
            {children}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Modal;
