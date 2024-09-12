import React, { useCallback, useState } from 'react';
import {
  menuContainer,
  kebabButton,
  dropdownMenu,
  dropdownMenuVisible,
  menuItem,
  menuItemText,
  deleteItem,
} from './kebab.css';
import { deleted, kebab, modify, share } from '../../assets/assets';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useNavigate, useParams } from 'react-router-dom';

const KebabMenu = () => {
  const { shoesId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const deleteData = async (shoesId: string) => {
    try {
      // 'myshoes'는 컬렉션 이름, shoesId는 삭제할 문서의 ID
      await deleteDoc(doc(db, 'myshoes', shoesId));
      console.log('문서 삭제 성공');
    } catch (e) {
      console.error('문서 삭제 에러: ', e);
    }
  };

  const handleDelete = async () => {
    if (shoesId) {
      try {
        await deleteData(shoesId);
        alert('삭제되었습니다.');
        navigate(-1);
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    } else {
      console.error('shoesId가 정의되지 않았습니다.');
    }
  };

  const editData = async (shoesId: string, updateFields: any) => {
    try {
      await updateDoc(doc(db, 'myshoes', shoesId), updateFields);
      console.log('수정 완료');
    } catch (e) {
      console.error('수정 실패');
    }
  };

  const handleEdit = () => {
    // editData(shoesId, updateFields);
    console.log('수정 버튼 클릭됨');
  };

  const handleShare = () => {
    console.log('공유 버튼 클릭됨');
  };

  // const handleClickOutside = useCallback((event: MouseEvent) => {
  //   if (event.target instanceof HTMLElement && !event.currentTarget.contains(event.target)) {
  //     setIsOpen(false);
  //   }
  // }, []);

  return (
    <div className={menuContainer}>
      <button className={kebabButton} onClick={toggleMenu}>
        <img src={kebab} />
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
        <div className={menuItem} onClick={handleShare}>
          <p className={menuItemText}>
            <img src={share} alt="공유" />
            공유하기
          </p>
        </div>
      </div>
    </div>
  );
};

export default KebabMenu;
