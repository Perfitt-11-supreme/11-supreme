import { motion } from 'framer-motion';
import { useState } from 'react';
import { bar } from '../../../assets/assets.css';
import { barBox, modalContainer, modalContainerTitle, modalContainerWrapper } from './modal.css';

type TModal = {
  title?: string;
  height: string;
  children?: React.ReactNode;
};

const Modal = ({ title, height, children }: TModal) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className={modalContainerWrapper}> {/* 모달 컨테이너 래퍼 추가 */}
        <motion.div
          className={modalContainer}
          initial={{ height: '125px' }}
          animate={{ height: isOpen ? height : '125px' }}
          transition={{ duration: 0.5 }}
        >
          <div className={barBox}>
            {title === '관심키워드' ? null : <img src={bar} alt="bar" onClick={handleModalClick} />}
          </div>
          {title && <h1 className={modalContainerTitle}>{title}</h1>}
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default Modal;
