import { AnalyzeItem_AnalyzerContainerMove, AnalyzeItem_Container } from './analyzeitem.css.ts';
import { useEffect, useRef } from 'react';
import SuccesProduct from './succesproduct/SuccesProduct.tsx';
import useImageSearchStore from '../../../../stores/useImageSearchStore.ts';
import IsLoading from '../../isLoading/IsLoading.tsx';

const AnalyzeItem = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { isAnalyze, isSuccess, isSimilar, setIsState } = useImageSearchStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSimilar && divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsState({ isAnalyze: false, isSuccess: false, isSimilar: false });
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
        className={`${AnalyzeItem_Container} ${AnalyzeItem_AnalyzerContainerMove.hidden} ${
          isAnalyze
            ? AnalyzeItem_AnalyzerContainerMove.analyze
            : isSuccess
            ? AnalyzeItem_AnalyzerContainerMove.success
            : ''
        } `}
      >
        {isSuccess ? <SuccesProduct /> : isAnalyze && <IsLoading text="분석중" />}
      </div>
    </>
  );
};
export default AnalyzeItem;
