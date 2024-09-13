import { circle } from '../../../assets/assets';
import './isloading.css';
import { IsLoading_Circle, IsLoading_MarginTop, IsLoading_Text, IsLoading_Window } from './isloading.css.ts';

export default function IsLoading({ text, isMargin }: { text: string; isMargin?: boolean }) {
  return (
    <>
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
    </>
  );
}
