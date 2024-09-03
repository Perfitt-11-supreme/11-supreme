import { barBox, modalContainer, modalContainerTitle } from './modal.css';
import { bar } from '../../../assets/assets.css';

type TModal = {
  title: string;
  height: string;
};

const Modal = ({ title, height }: TModal) => {
  return (
    <>
      <div className={modalContainer} style={{ height }}>
        <div className={barBox}>{title === '회원가입' && <img src={bar} alt="bar" />}</div>
        <h1 className={modalContainerTitle}>{title}</h1>
      </div>
    </>
  );
};

export default Modal;
