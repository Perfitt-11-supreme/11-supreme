// 아이콘 / css
import { circle } from '../../../assets/assets';
import {
  IsLoading_Circle,
  IsLoading_Container,
  IsLoading_MarginTop,
  IsLoading_Text,
  IsLoading_Window,
} from './isloading.css';

export default function IsLoading({ text, isMargin }: { text: string; isMargin?: boolean }) {
  return (
    <div className={IsLoading_Container}>
      {isMargin ? (
        <div className={`${IsLoading_Window} ${IsLoading_MarginTop}`}>
          <img className={`rotatingImage ${IsLoading_Circle}`} src={circle} alt="analyze" />
          <p className={IsLoading_Text}>{text}</p>
        </div>
      ) : (
        <div className={IsLoading_Window}>
          <img className={`rotatingImage ${IsLoading_Circle}`} src={circle} alt="analyze" />
          <p className={IsLoading_Text}>{text}</p>
        </div>
      )}
    </div>
  );
}
