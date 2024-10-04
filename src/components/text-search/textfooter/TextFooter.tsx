// 리액트 / css
import { useNavigate } from 'react-router-dom';
import { TextFooter_Background } from './textfooter.css';
// Zustand
import useTextSearchStore from '../../../stores/useTextSearchStore';
import useSelectItemStore from '../../../stores/useSelectItemStore';
// 컴포넌트
import Button from '../../common/button/Button';

const TextFooter = () => {
  const { focus, isSubmit, resetState } = useTextSearchStore();
  const { selectProduct, setIsSelected, setSelectComplet } = useSelectItemStore();
  const navigate = useNavigate();

  const handleNavigate = () => {
    resetState();
    setSelectComplet(true);
    setIsSelected(null);
    navigate('/shoes-registry');
  };
  return (
    <>
      {isSubmit && !focus && (
        <div className={TextFooter_Background}>
          {selectProduct ? (
            <Button text="선택 완료" onClick={handleNavigate} type="button" />
          ) : (
            <Button text="선택해주세요" type="button" opacity={true} />
          )}
        </div>
      )}
    </>
  );
};
export default TextFooter;
