// 리액트 / css
import { useRef } from 'react';
import {
  AnalyzeImage_AnalyzerContainerMove,
  AnalyzeImage_Button,
  AnalyzeImage_Container,
  AnalyzeImage_SimilarContainer,
} from './analyzeimage.css.ts';
// 커스텀 훅
import { useImageSearchHooks } from '../hooks/useImageSearchHooks.ts';
// Zustand
import useSelectItemStore from '../../../../stores/useSelectItemStore.ts';
import useImageSearchStore from '../../../../stores/useImageSearchStore.ts';
// 컴포넌트
import IsLoading from '../../isLoading/IsLoading.tsx';
import SuccesProduct from './succesproduct/SuccesProduct.tsx';
import Button from '../../../common/button/Button.tsx';
import AgainBox from '../againbox/AgainBox.tsx';
import ItemListBox from '../../itemlistbox/ItemListBox.tsx';

const AnalyzeImage = () => {
  const { isAnalyze, isSuccess, isSimilar } = useImageSearchStore();
  const { handleImageSearchNavigate } = useImageSearchHooks();
  const divRef = useRef<HTMLDivElement>(null);
  const { selectProduct } = useSelectItemStore();

  const renderContent = () => {
    if (isAnalyze) {
      return <IsLoading text="분석중" />;
    }
    if (isSuccess || isSimilar) {
      return (
        <>
          <AgainBox />
          {isSimilar ? (
            <div className={AnalyzeImage_SimilarContainer}>
              <ItemListBox paddingTop={false} />
            </div>
          ) : (
            <SuccesProduct />
          )}
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
      <div
        className={`${AnalyzeImage_Container} ${
          isSuccess || isSimilar
            ? AnalyzeImage_AnalyzerContainerMove.success
            : isAnalyze
            ? AnalyzeImage_Container + ' ' + AnalyzeImage_AnalyzerContainerMove.analyze
            : ''
        }`}
      >
        {renderContent()}
      </div>
    </>
  );
};
export default AnalyzeImage;
