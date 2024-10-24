import { create } from 'zustand';

type textSearchData = {
  focus: boolean;
  text: string;
  postText: string;
  isLoading: boolean;
  isSubmit: boolean;
  isScrolling: boolean;
  setFocus: (focus: boolean) => void;
  setText: (text: string) => void;
  setPostText: (postText: string) => void;
  setLoading: (isLoading: boolean) => void;
  setSubmit: (isSubmit: boolean) => void;
  setIsScrolling: (isScrolling: boolean) => void;
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
  isScrolling: false,
  setFocus: focus =>
    set(state => {
      if (focus !== state.focus) {
        return { focus };
      }
      return state;
    }),
  setText: text =>
    set(state => {
      if (text !== state.text) {
        return { text };
      }
      return state;
    }),
  setPostText: postText =>
    set(state => {
      if (postText !== state.postText) {
        return { postText };
      }
      return state;
    }),
  setLoading: isLoading =>
    set(state => {
      if (isLoading !== state.isLoading) {
        return { isLoading };
      }
      return state;
    }),
  setSubmit: isSubmit =>
    set(state => {
      if (isSubmit !== state.isSubmit) {
        return { isSubmit };
      }
      return state;
    }),
  setIsScrolling: isScrolling =>
    set(state => {
      if (isScrolling !== state.isScrolling) {
        return { isScrolling };
      }
      return state;
    }),
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
  clearTextRecord: () =>
    set(state => {
      if (state.textRecord.length > 0) {
        return { textRecord: [], postText: '' };
      }
      return {};
    }),
}));

export default useTextSearchStore;
