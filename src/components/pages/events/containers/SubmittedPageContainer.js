import { compose } from 'recompose';
import { connect } from 'react-redux';
import SubmittedPage from '../SubmittedPage';

export default compose(
  connect(state => ({
    submittedEvent: state.event.submittedEvent
  }))
)(SubmittedPage);
