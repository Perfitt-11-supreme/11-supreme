import { AnalyzeImage_AnalyzerContainerMove, AnalyzeImage_Button, AnalyzeImage_Container } from './analyzeimage.css.ts';
import SuccesProduct from './succesproduct/SuccesProduct.tsx';
import useImageSearchStore from '../../../../stores/useImageSearchStore.ts';
import IsLoading from '../../isLoading/IsLoading.tsx';
import SimilarProduct from './similarproduct/SimilarProduct.tsx';
import Button from '../../../common/button/Button.tsx';
import { useImageSearchHooks } from '../hooks/useImageSearchHooks.ts';
import AgainBox from '../againbox/AgainBox.tsx';
import { useRef } from 'react';
import useSelectItemStore from '../../../../stores/useSelectItemStore.ts';

const AnalyzeImage = () => {
  const { isAnalyze, isSuccess, isSimilar } = useImageSearchStore();
  const { handleImageSearchNavigate } = useImageSearchHooks();
  const divRef = useRef<HTMLDivElement>(null);
  const { selectProduct } = useSelectItemStore();

  const getClassNames = () => {
    let classNames = `${AnalyzeImage_Container}`;
    if (isSuccess || isSimilar) {
      classNames += ` ${AnalyzeImage_AnalyzerContainerMove.success}`;
    } else if (isAnalyze) {
      classNames += ` ${AnalyzeImage_AnalyzerContainerMove.analyze}`;
    }
    return classNames;
  };

  const renderContent = () => {
    if (isAnalyze) {
      return <IsLoading text="분석중" />;
    }
    if (isSuccess || isSimilar) {
      return (
        <>
          <AgainBox />
          {isSimilar ? <SimilarProduct /> : <SuccesProduct />}
          <div className={AnalyzeImage_Button} ref={divRef}>
            <Button
              text={`${isSuccess ? '선택완료' : selectProduct ? '선택완료' : '선택해주세요'}`}
              onClick={() => {
                if (isSuccess) {
                  handleImageSearchNavigate(isSimilar);
                } else if (isSimilar) {
                  handleImageSearchNavigate(isSimilar);
                }
              }}
              type="button"
              opacity={isSuccess ? false : selectProduct ? false : true}
            />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className={getClassNames()}>{renderContent()}</div>
    </>
  );
};
export default AnalyzeImage;
