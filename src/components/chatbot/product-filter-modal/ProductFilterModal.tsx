import { motion } from 'framer-motion';
import { bar } from '../../../assets/assets';
import useModalStore from '../../../stores/useModalStore';
import { barBox, modalContainer, modalContainerTitle, modalContainerWrapper } from './productFilterModal.css';


type TModal = {
  title?: string;
  height: string;
  children?: React.ReactNode;
};

const ProductFilterModal = ({ title, height, children }: TModal) => {
  const { filterOpen, setFilterOpen } = useModalStore();

  const handleModalClose = () => {
    setFilterOpen(false);  // 모달 닫기
  };

  const isInterestKeyword = title === '관심 키워드' || title === '필터';

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
            initial={{ height: '0px' }}
            animate={{ height: filterOpen ? height : '0px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={barBox} onClick={handleModalClose}>
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

export default ProductFilterModal;
