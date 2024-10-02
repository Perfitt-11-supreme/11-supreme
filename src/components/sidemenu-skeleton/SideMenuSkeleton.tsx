import { motion } from 'framer-motion';
import { skeletonWrap } from './sidemenuSkeleton.css';

const SkeletonItem = ({ width }: { width: string }) => (
  <motion.span
    style={{
      width,
      height: '20px',
      borderRadius: '4px',
      backgroundColor: '#e0e0e0',
    }}
    animate={{
      backgroundColor: ['#e0e0e0', '#f0f0f0', '#e0e0e0'],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

const SideMenuSkeleton = () => {
  return (
    <div className={skeletonWrap}>
      <SkeletonItem width="100%" />
      <SkeletonItem width="80%" />
      <SkeletonItem width="60%" />
    </div>
  );
};

export default SideMenuSkeleton;