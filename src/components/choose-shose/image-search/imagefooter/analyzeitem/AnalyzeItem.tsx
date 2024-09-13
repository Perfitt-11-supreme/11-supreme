import { AnalyzeItem_AnalyzerContainerMove, AnalyzeItem_Container } from './analyzeitem.css.ts';
import { useEffect, useRef } from 'react';
import SuccesProduct from './succesproduct/SuccesProduct.tsx';
import useImageSearchStore from '../../../../../stores/useImageSearchStore.ts';
import IsLoading from '../../../isLoading/IsLoading.tsx';

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
        {isSuccess ? <SuccesProduct /> : <IsLoading text="분석중" />}
      </div>
    </>
  );
};
export default AnalyzeItem;
