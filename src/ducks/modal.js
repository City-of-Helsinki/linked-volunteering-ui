// @flow
import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import type { Action, ModalFactory, ModalState } from '../types/redux';

const defaultState: ModalFactory = Record({
  isOpen: false
});

export const toggleModal = createAction('TOGGLE_MODAL');

export default (state: ModalState = defaultState(), action: Action): ModalState => {
  const { type } = action;
  switch (type) {
    case 'TOGGLE_MODAL':
      return state.update('isOpen', visible => !visible);
    default:
      return state;
  }
};
