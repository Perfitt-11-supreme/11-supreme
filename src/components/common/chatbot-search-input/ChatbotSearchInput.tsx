import { push, ref, set } from 'firebase/database';
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { picture, upload } from '../../../assets/assets';
import { database } from '../../../firebase/firebase';
import useBrandStore from '../../../stores/useBrandStore';
import useProductStore from '../../../stores/useProductsStore';
import useUserStore from '../../../stores/useUserStore';
import {
  chatbotSearchContainer,
  chatbotSearchInput,
  chatbotSearchInputBox,
  pictureIconBox,
  previewImageContainer,
  uploadIconBox,
} from './chatbotSearchInput.css';

import { useMutation } from '@tanstack/react-query';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { ImageShoseSearchAPI } from '../../../api/searchRequests';
import { useChatCompletion } from '../../../hooks/useChatCompletionHook';
import useChatStore from '../../../stores/useChatStore';
import { ChatItem } from '../../../types/chatItem';
import ToastMessage from '../../toastmessage/toastMessage';

export type Brand = {
  brand: string;
  description: string;
  link: string;
  thumbnail: string;
};

const ChatbotSearchInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const { user } = useUserStore();
  const { setProducts } = useProductStore();
  const { setBrands } = useBrandStore();
  const { addChatItem, setCurrentKeywords } = useChatStore();
  const { chatCompletionsMutation, createNewChat } = useChatCompletion();

  const imageSearchMutation = useMutation({
    mutationFn: async (file: File) => {
      const storage = getStorage();
      const imageRef = storageRef(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);

      const formData = new FormData();
      formData.append('image', file);
      const response = await ImageShoseSearchAPI(formData);

      return { response, imageUrl };
    },
    onSuccess: async ({ response, imageUrl }) => {
      // console.log('이미지 검색 성공:', response);

      const chatItemWithoutIds = {
        userQuestion: '',
        botResponse: '이미지 검색 결과입니다.',
        products: response.data.products || null,
        brands: response.data.brands || null,
        keywords: '이미지 검색',
        imageUrl: imageUrl,
        timestamp: new Date().toISOString(),
      };

      const shareId = await saveSharedChatHistory(chatItemWithoutIds);
      let chatId = useChatStore.getState().currentChatId;
      if (!chatId) {
        chatId = await createNewChat();
      }

      const newChatItem: ChatItem = {
        id: push(ref(database, `users/${user?.uid}/chats/${chatId}/messages`)).key || '',
        shareId,
        ...chatItemWithoutIds,
      };

      if (user?.uid) {
        push(ref(database, `users/${user?.uid}/chats/${chatId}/messages`), newChatItem);
      }
      setProducts(response.data.products);
      setBrands(response.data.brands);
      setCurrentKeywords('이미지 검색');

      addChatItem(newChatItem);
    },
    onError: error => {
      console.error('이미지 검색 에러:', error);
    },
  });

  const saveSharedChatHistory = async (chatItem: Omit<ChatItem, 'id' | 'shareId'>): Promise<string> => {
    const shareId = push(ref(database, 'sharedChatHistory')).key;
    if (shareId) {
      await set(ref(database, `sharedChatHistory/${shareId}`), chatItem);
      // console.log('공유용 채팅 히스토리 저장 성공:', shareId);
      return shareId;
    }
    throw new Error('Failed to generate shareId');
  };

  const handleImageUpload = (file: File) => {
    imageSearchMutation.mutate(file);
  };

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSubmit = useCallback(
    debounce((value: string) => {
      // console.log('Submitting:', value);
      if (value.trim() !== '') {
        chatCompletionsMutation.mutate(value.trim());
      }
      setInputValue('');
    }, 300),
    [chatCompletionsMutation]
  );

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (selectedFile) {
      handleImageUpload?.(selectedFile);
      setSelectedFile(null);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      debouncedSubmit(inputValue);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing && !selectedFile) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = e => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      //로그인 상태가 아닐 때 입력 차단 및 토스트 메시지 표시
      setToastMessage({ message: '먼저 로그인을 해주세요.', duration: 3000 });
      return;
    } else {
      //로그인 상태일 때만 입력값 업데이트
      setInputValue(e.target.value);
    }
  };

  const [toastMessage, setToastMessage] = useState<{ message: string; duration: number } | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), toastMessage.duration);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className={chatbotSearchContainer}>
      {toastMessage && <ToastMessage message={toastMessage.message} duration={toastMessage.duration} />}
      <div className={pictureIconBox} onClick={handlePictureClick}>
        <img src={picture} alt="picture" />
      </div>
      <div className={chatbotSearchInputBox}>
        {previewImage && (
          <div className={previewImageContainer}>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                marginRight: '5px',
              }}
            />
            <button
              onClick={handleRemoveImage}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              ×
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          className={chatbotSearchInput}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={selectedFile ? '이미지가 첨부되었습니다' : '궁금한 신발 정보 물어보세요!'}
          style={{ paddingLeft: previewImage ? '80px' : '10px' }}
          onKeyDown={handleKeyDown}
          disabled={selectedFile !== null}
        />
        <button className={uploadIconBox} onClick={handleButtonClick}>
          <img src={upload} alt="upload" />
        </button>
      </div>
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default ChatbotSearchInput;
