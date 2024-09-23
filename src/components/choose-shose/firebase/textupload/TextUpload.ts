import useTextSearchStore from '../../../../stores/useTextSearchStore';
import useUserStore from '../../../../stores/useUserStore';
import { USER_COLLECTION } from '../../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const TextUpload = () => {
  const { textRecord } = useTextSearchStore();
  const { user } = useUserStore();

  const handleTextUpload = async () => {
    const userDoc = doc(USER_COLLECTION, user?.uid);
    await updateDoc(userDoc, {
      textSearchRecord: textRecord,
    });
  };

  return { handleTextUpload };
};
