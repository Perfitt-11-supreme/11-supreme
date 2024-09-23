import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type textSearchData = {
  focus: boolean;
  text: string;
  postText: string;
  isLoading: boolean;
  isSubmit: boolean;
  setState: (updateData: Partial<textSearchData>) => void;
  resetState: () => void;
};

type textRecordData = {
  textRecord: string[];
  downloadTextRecord: (textRecord: string[]) => void;
  setTextRecord: (text: string, textArray?: string[]) => void;
  clearTextRecord: () => void;
};

const useTextSearchStore = create(
  persist<textSearchData & textRecordData>(
    set => ({
      focus: true,
      text: '',
      postText: '',
      isLoading: true,
      isSubmit: false,
      setState: updateData => set(state => ({ ...state, ...updateData })),
      resetState: () => {
        set({
          focus: true,
          text: '',
          postText: '',
          isLoading: true,
          isSubmit: false,
        });
      },

      textRecord: [],
      downloadTextRecord: textRecord => {
        console.log('텍스트검색 다운로드 성공');
        set({ textRecord });
      },
      setTextRecord: (text, textArray?) => {
        set(state => {
          if (textArray) {
            return {
              textRecord: [text, ...textArray],
            };
          } else {
            return {
              textRecord: [text, ...state.textRecord],
            };
          }
        });
      },
      clearTextRecord: () => set({ textRecord: [], postText: '' }),
    }),
    {
      name: 'textSearchStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTextSearchStore;
