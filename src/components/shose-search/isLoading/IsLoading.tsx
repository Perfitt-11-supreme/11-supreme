// css
import {
  IsLoading_Circle,
  IsLoading_Container,
  IsLoading_MarginTop,
  IsLoading_Text,
  IsLoading_Window,
} from './isloading.css';
import { motion } from 'framer-motion';

export default function IsLoading({ text, isMargin }: { text: string; isMargin?: boolean }) {
  const spinnerVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  };

  return (
    <div className={IsLoading_Container}>
      <div className={`${IsLoading_Window} ${isMargin ? IsLoading_MarginTop : ''}`}>
        <motion.div
          className={IsLoading_Circle}
          variants={spinnerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className={IsLoading_Text}>{text}</p>
      </div>
    </div>
  );
}
