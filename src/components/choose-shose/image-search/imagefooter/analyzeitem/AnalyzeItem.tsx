import { circle } from '../../../../../assets/assets.ts';
import {
  AnalyzeItem_AnalyzeCircle,
  AnalyzeItem_AnalyzerWindow,
  AnalyzeItem_AnalyzerContainerMove,
  AnalyzeItem_AnalyzeText,
  AnalyzeItem_Container,
} from './analyzeitem.css.ts';
import './analyzeitem.css';
import { useEffect, useRef, useState } from 'react';
import SuccesProduct from './succesproduct/SuccesProduct.tsx';

const AnalyzeItem = ({
  isClickIcon,
  handleClickIcon,
  capturedImage,
}: {
  isClickIcon: boolean;
  handleClickIcon: (bol: boolean) => void;
  capturedImage: string | null;
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSimilar, setIsSimilar] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickAgain = () => {
    handleClickIcon(false);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (!isClickIcon) return;
    if (isSuccess) return;

    const timer = setTimeout(() => {
      setIsSuccess(true);
      clearTimeout(timer);
    }, 5000);
  }, [isClickIcon]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // divRef와 그 아래 자식 요소를 제외한 클릭을 감지
      if (isSimilar && divRef.current && !divRef.current.contains(event.target as Node)) {
        console.log(isSimilar);
        handleClickIcon(false);
        setIsSimilar(false);
        setIsSuccess(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSimilar]);

  return (
    <>
      <div
        ref={divRef}
        className={`${AnalyzeItem_Container} ${
          isClickIcon
            ? isSuccess
              ? AnalyzeItem_AnalyzerContainerMove.success
              : AnalyzeItem_AnalyzerContainerMove.analyze
            : AnalyzeItem_AnalyzerContainerMove.hidden
        }`}
      >
        {isSuccess ? (
          <SuccesProduct
            handleClickAgain={handleClickAgain}
            isSimilar={isSimilar}
            setIsSimilar={setIsSimilar}
            capturedImage={capturedImage}
          />
        ) : (
          <div className={AnalyzeItem_AnalyzerWindow}>
            <img className={`rotatingImage ${AnalyzeItem_AnalyzeCircle}`} src={circle} alt="analyze" />
            <p className={AnalyzeItem_AnalyzeText}>분석중</p>
          </div>
        )}
      </div>
    </>
  );
};
export default AnalyzeItem;
