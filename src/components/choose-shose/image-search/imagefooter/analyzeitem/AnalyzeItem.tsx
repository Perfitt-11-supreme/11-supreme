import { circle } from '../../../../../assets/assets.ts';
import {
  AnalyzeItem_AnalyzeCircle,
  AnalyzeItem_AnalyzerWindow,
  AnalyzeItem_AnalyzerContainerMove,
  AnalyzeItem_AnalyzeText,
  AnalyzeItem_Container,
} from './analyzeitem.css.ts';
import './analyzeitem.css';
import { useEffect, useRef } from 'react';
import SuccesProduct from './succesproduct/SuccesProduct.tsx';
import useImageSearchStore from '../../../../../stores/useImageSearchStore.ts';

const AnalyzeItem = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { isAnalyze, isSuccess, isSimilar, setIsState, handleCaptureImage } = useImageSearchStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSimilar && divRef.current && !divRef.current.contains(event.target as Node)) {
        handleCaptureImage(false);
        setIsState({ isSuccess: false, isSimilar: false });
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
          isAnalyze
            ? isSuccess
              ? AnalyzeItem_AnalyzerContainerMove.success
              : AnalyzeItem_AnalyzerContainerMove.analyze
            : AnalyzeItem_AnalyzerContainerMove.hidden
        }`}
      >
        {isSuccess ? (
          <SuccesProduct />
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
