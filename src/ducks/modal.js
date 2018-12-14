// @flow
import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import type { Action, ModalFactory, ModalState } from '../types/redux';

const defaultState: ModalFactory = Record({
  isOpen: false,
  modal: null,
  meta: null
});

export const openModal = createAction('OPEN_MODAL', modal => modal, (modal, meta) => meta);
export const closeModal = createAction('CLOSE_MODAL');

export default (state: ModalState = defaultState(), action: Action): ModalState => {
  const { type, payload, meta } = action;
  switch (type) {
    case 'OPEN_MODAL':
      return state
        .set('isOpen', true)
        .set('modal', payload)
        .set('meta', meta);
    case 'CLOSE_MODAL':
      return state.set('isOpen', false);
    default:
      return state;
  }
};
