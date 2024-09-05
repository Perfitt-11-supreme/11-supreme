import { analyze } from '../../../../../assets/assets.ts';
import {
  AnalyzeItem_AnalyzeCircle,
  AnalyzeItem_AnalyzerWindow,
  AnalyzeItem_AnalyzerContainerMove,
  AnalyzeItem_AnalyzeText,
  AnalyzeItem_Container,
} from './analyzeitem.css.ts';
import './analyzeitem.css';

const AnalyzeItem = ({ isClickIcon }: { isClickIcon: boolean }) => {
  return (
    <>
      <div
        className={`${AnalyzeItem_Container} ${
          isClickIcon ? AnalyzeItem_AnalyzerContainerMove.visible : AnalyzeItem_AnalyzerContainerMove.hidden
        }`}
      >
        <div className={AnalyzeItem_AnalyzerWindow}>
          <img className={`rotatingImage ${AnalyzeItem_AnalyzeCircle}`} src={analyze} alt="analyze" />
          <p className={AnalyzeItem_AnalyzeText}>분석중</p>
        </div>
      </div>
    </>
  );
};
export default AnalyzeItem;
