import { motion } from 'framer-motion';
import { bar } from '../../../assets/assets.css';
import useModalStore from '../../../stores/useModalStore';
import { barBox, modalContainer, modalContainerTitle, modalContainerWrapper } from './modal.css';

type TModal = {
  title?: string;
  height: string;
  children?: React.ReactNode;
};

const Modal = ({ title, height, children }: TModal) => {
  const { isOpen, setIsOpen } = useModalStore();

  const handleModalClick = () => {
    if (title !== '관심 키워드') {
      setIsOpen(!isOpen);
    }
  }

  const isInterestKeyword = title === '관심 키워드';

  return (
    <>
      <div className={modalContainerWrapper}>
        {isInterestKeyword ? (
          <div
            className={modalContainer}
            style={{ height: height }}
          >
            <div className={barBox} />

            {title && <h1 className={modalContainerTitle}>{title}</h1>}
            {children}
          </div>
        ) : (
          <motion.div
            className={modalContainer}
            initial={{ height: '125px' }}
            animate={{ height: isOpen ? height : '125px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={barBox} onClick={handleModalClick}>
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
