import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as modals from '../../components/modal/modals';

interface ModalState {
  isOpen: boolean;
  modal: keyof typeof modals | null;
  meta: unknown;
}

const initialState: ModalState = {
  isOpen: false,
  modal: null,
  meta: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ modal: keyof typeof modals; meta: unknown }>
    ) => {
      state.isOpen = true;
      state.modal = action.payload.modal;
      state.meta = action.payload.meta;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modal = null;
      state.meta = null;
    },
  },
  selectors: {
    modalSelector: (state) => state,
  },
});

export const { modalSelector } = modalSlice.selectors;
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
