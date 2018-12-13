import { compose } from 'recompose';
import { connect } from 'react-redux';

import { toggleModal } from '../../../ducks/modal';
import Modal from '../Modal';

export default compose(
  connect(
    state => ({
      isOpen: state.modal.isOpen
    }),
    { toggleModal }
  )
)(Modal);
