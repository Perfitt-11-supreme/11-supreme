import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleted, kebab, modify } from '../../assets/assets';
import { db } from '../../firebase/firebase';
import {
  deleteItem,
  dropdownMenu,
  dropdownMenuVisible,
  kebabButton,
  menuContainer,
  menuItem,
  menuItemText,
} from './kebab.css';
// import ToastMessage from '../toastmessage/toastMessage';

const KebabMenu = () => {
  const { shoesId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen);
  };

  const deleteData = async (shoesId: string) => {
    try {
      // 'myshoes'는 컬렉션 이름, shoesId는 삭제할 문서의 ID
      await deleteDoc(doc(db, 'myshoes', shoesId));
      // console.log('문서 삭제 성공');
    } catch (e) {
      console.error('문서 삭제 에러: ', e);
    }
  };

  const handleDelete = async () => {
    if (shoesId) {
      try {
        await deleteData(shoesId);
        navigate('/empty-shoesroom', {
          state: { deleteToastMessage: '삭제되었습니다' },
        });
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    } else {
      console.error('shoesId가 정의되지 않았습니다.');
    }
  };

  const handleEdit = () => {
    if (shoesId) {
      navigate(`/shoes-registry/${shoesId}`);
    }
    // console.log('수정 버튼 클릭됨');
  };

  return (
    <div className={menuContainer}>
      <button className={kebabButton} onClick={toggleMenu}>
        <img src={kebab} alt="케밥 아이콘" />
      </button>
      <div className={`${dropdownMenu} ${isOpen ? dropdownMenuVisible : ''}`}>
        <div className={menuItem} onClick={handleDelete}>
          <p className={`${menuItemText} ${deleteItem}`}>
            <img src={deleted} alt="삭제" />
            삭제하기
          </p>
        </div>
        <div className={menuItem} onClick={handleEdit}>
          <p className={menuItemText}>
            <img src={modify} alt="수정" />
            수정하기
          </p>
        </div>
      </div>
    </div>
  );
};

export default KebabMenu;
