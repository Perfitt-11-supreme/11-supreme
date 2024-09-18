import { create } from 'zustand';

type textSearchStore = {
  handleSubmitSearch: () => void;
  handleCLickRecentRecord: (str: string) => void;
  handleFocusSearchBox: (bol: boolean) => void;
};

type textSearchData = {
  record: string[];
  focus: boolean;
  text: string;
  postText: string;
  remove: boolean;
  isLoading: boolean;
  isSubmit: boolean;
  setState: (updateData: Partial<textSearchData>) => void;
};

const useTextSearchStore = create<textSearchStore & textSearchData>(set => ({
  record: [],
  focus: true,
  text: '',
  postText: '',
  remove: false,
  isLoading: true,
  isSubmit: false,
  setState: updateData => set(state => ({ ...state, ...updateData })),

  handleSubmitSearch: () => {
    set(state => {
      const text = state.text;
      const record = state.record;

      if (text.length === 0) return {};

      if (record.length >= 10) {
        record.pop();
      }

      if (record.includes(text)) {
        const filterRecord = record.filter(item => item !== text);
        filterRecord.unshift(text);

        state.setState({ record: filterRecord });
      } else {
        state.setState({ record: [text, ...record] });
      }
      return {};
    });
  },
  handleCLickRecentRecord: str => {
    set(state => {
      const filterRecord = state.record.filter(item => item !== str);
      filterRecord.unshift(str);

      state.setState({ record: filterRecord, text: str });
      return {};
    });
  },
  handleFocusSearchBox: bol => {
    set(state => {
      if (!state.isSubmit) {
        return {};
      }
      if (state.remove) {
        state.setState({ remove: false });
        return {};
      }
      state.setState({ focus: bol });
      return {};
    });
  },
}));

export default useTextSearchStore;
