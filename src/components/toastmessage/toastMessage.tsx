import { useEffect, useState } from 'react';
import { toastContainer, toastMessage, showToast } from './toast-message.css'; // 스타일 정의

const ToastMessage = ({ message, duration }: { message: string; duration: number }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`${toastContainer} ${visible ? showToast : ''}`}>
      <p className={toastMessage}>{message}</p>
    </div>
  );
};

export default ToastMessage;
