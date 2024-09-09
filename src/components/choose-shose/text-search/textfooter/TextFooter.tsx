import { useNavigate } from 'react-router-dom';
import Button from '../../../common/button/Button';
import { TextFooter_Background } from './textfooter.css';

const TextFooter = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/shoes-registry');
  };
  return (
    <>
      <div className={TextFooter_Background}>
        <Button text="선택 완료" onClick={handleNavigate} />
      </div>
    </>
  );
};
export default TextFooter;
