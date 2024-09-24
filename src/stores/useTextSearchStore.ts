import { create } from 'zustand';

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

const useTextSearchStore = create<textSearchData & textRecordData>(set => ({
  focus: true,
  text: '',
  postText: '',
  isLoading: false,
  isSubmit: false,
  setState: updateData => set(state => ({ ...state, ...updateData })),
  resetState: () => {
    set({
      focus: true,
      text: '',
      postText: '',
      isLoading: false,
      isSubmit: false,
    });
  },

  textRecord: [],
  downloadTextRecord: textRecord => {
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
}));

export default useTextSearchStore;
