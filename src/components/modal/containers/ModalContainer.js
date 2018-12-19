// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../../ducks/modal';
import Modal from '../Modal';
import type { Store } from '../../../types/redux';

export default compose(
  connect(
    (state: Store) => ({
      isOpen: state.modal.isOpen,
      modal: state.modal.modal,
      meta: state.modal.meta
    }),
    dispatch => ({
      dispatch,
      closeModal: bindActionCreators(closeModal, dispatch)
    })
  )
)(Modal);
