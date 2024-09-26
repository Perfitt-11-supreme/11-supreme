import { AgainClickBox, AgainContainer, AgainIcon, AgainText } from './againbox.css';
import { again } from '../../../../assets/assets';
import useImageSearchStore from '../../../../stores/useImageSearchStore';
import useSelectItemStore from '../../../../stores/useSelectItemStore';

const AgainBox = () => {
  const { resetItem } = useSelectItemStore();
  const { resetState } = useImageSearchStore();
  return (
    <div className={AgainContainer}>
      <div
        className={AgainClickBox}
        onClick={() => {
          resetState();
          resetItem();
        }}
      >
        <img className={AgainIcon} src={again} alt="again" />
        <p className={AgainText}>다시하기</p>
      </div>
    </div>
  );
};

export default AgainBox;
