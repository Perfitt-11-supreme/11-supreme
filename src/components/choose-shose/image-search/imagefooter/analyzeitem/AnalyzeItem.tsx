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
import useCaptureStore from '../../../../../stores/useCaptureStore.ts';
import useAnalyzeStore from '../../../../../stores/useAnalyzeStore.ts';

const AnalyzeItem = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSimilar, setIsSimilar] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const { handleClickCameraIcon } = useCaptureStore();
  const { isAnalyze } = useAnalyzeStore();

  const clickAgain = () => {
    handleClickCameraIcon(false);
    setIsSuccess(false);
  };

  useEffect(() => {
    useCaptureStore.setState({ handleClickAgain: clickAgain });
  }, []);

  useEffect(() => {
    if (!isAnalyze) return;
    if (isSuccess) return;

    const timer = setTimeout(() => {
      setIsSuccess(true);
      clearTimeout(timer);
    }, 5000);
  }, [isAnalyze]);

  console.log(isAnalyze);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSimilar && divRef.current && !divRef.current.contains(event.target as Node)) {
        console.log(isSimilar);
        handleClickCameraIcon(false);
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
          isAnalyze
            ? isSuccess
              ? AnalyzeItem_AnalyzerContainerMove.success
              : AnalyzeItem_AnalyzerContainerMove.analyze
            : AnalyzeItem_AnalyzerContainerMove.hidden
        }`}
      >
        {isSuccess ? (
          <SuccesProduct isSimilar={isSimilar} setIsSimilar={setIsSimilar} />
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
