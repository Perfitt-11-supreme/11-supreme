import { onValue, ref } from 'firebase/database';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { chatCircle, close, copy_left, link_angled, loading } from "../../../assets/assets";
import { database } from '../../../firebase/firebase';
import useModalStore from "../../../stores/useModalStore";
import { copyingButton, shareContainer, shareContentsBox, shareContentsTitle, shareDate, shareDescription, shareModalButton, shareTextWrap, shareTitle, shareWrap } from "./shareModal.css";

type Product = {
  productId: string;
  brand: string;
  modelName: string;
}

type Brand = {
  brand: string;
  description: string;
  link: string;
  thumbnail: string;
};

type ChatItem = {
  keywords: string;
  userQuestion: string;
  botResponse: string;
  products: Product[]; // 제품 배열
  brands: Brand[] | null;
  imageUrl?: string;
}


const ShareModal = () => {
  const [copyStatus, setCopyStatus] = useState<'default' | 'copying' | 'copied'>('default');
  const { isShareModalOpen, setIsShareModalOpen, shareModalId } = useModalStore();
  const [productData, setProductData] = useState<ChatItem | null>(null);
  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleCopyClick = async () => {
    setCopyStatus('copying');
    try {

      const shareUrl = `${window.location.origin}/share/${shareModalId}`;
      await navigator.clipboard.writeText(shareUrl);
      setTimeout(() => setCopyStatus('copied'), 500);
    } catch (err) {
      console.error('URL 복사 실패:', err);
      setCopyStatus('default');
    }
  };


  const renderButtonText = () => {
    if (copyStatus === 'copying') return '링크 복사 중';
    if (copyStatus === 'copied') return '복사 됨';
    return '링크 복사';
  };

  const renderButtonImage = () => {
    if (copyStatus === 'copying') return loading;
    if (copyStatus === 'copied') return copy_left;
    return link_angled;
  };


  useEffect(() => {
    const fetchData = () => {
      const productRef = ref(database, `chatHistory/${shareModalId}`); // 해당 아이디에 맞는 경로 설정
      onValue(productRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProductData(data); // 데이터를 상태에 저장
        } else {
          console.error('데이터가 없습니다.');
          setProductData(null); // 데이터가 없을 경우 null로 설정
        }
      }, (error) => {
        console.error('데이터 불러오기 에러:', error);
      });
    };

    fetchData();
  }, [shareModalId]);

  return (
    <AnimatePresence>
      {isShareModalOpen && (
        <motion.div
          className={shareWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={shareContainer}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={shareTextWrap}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={shareTitle}>공개 링크 생성됨</p>
                <motion.img
                  src={close}
                  onClick={handleCloseShareModal}
                  style={{ cursor: 'pointer' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </div>
              <p className={shareDescription}>채팅의 공개 링크가 생성되었습니다. 공유를 원하는 곳에 어디든지 전달하실 수 있습니다.</p>
            </div>
            <div className={shareContentsBox}>
              <div>
                <img src={chatCircle} alt="Chat Circle" />
              </div>
              <p className={shareContentsTitle}>
                {productData ? (
                  productData.userQuestion ? (
                    productData.userQuestion
                  ) : (
                    <img src={productData.imageUrl} alt="Product Image" />
                  )
                ) : null}
              </p>
              <p className={shareDate}>2024년 10월 30일</p>
            </div>
            <motion.button
              className={copyStatus === 'default' ? shareModalButton : copyingButton}
              onClick={handleCopyClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={renderButtonImage()} alt="link" />
              {renderButtonText()}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShareModal;