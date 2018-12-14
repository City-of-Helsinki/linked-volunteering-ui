import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../../ducks/modal';
import Modal from '../Modal';

export default compose(
  connect(
    state => ({
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
