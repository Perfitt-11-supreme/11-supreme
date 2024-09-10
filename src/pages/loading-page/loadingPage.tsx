import { motion } from 'framer-motion';
import { loading, loadingContainer, loadingText, loadingWrap } from "./loadingPage.css";
const LoadingPage = () => {
  const spinnerVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  };

  return (
    <div className={loadingWrap}>
      <div className={loadingContainer}>
        <motion.div
          className={loading}
          variants={spinnerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div className={loadingText}>Loading...</div>

      </div>
    </div>
  );
}
export default LoadingPage