import { compose } from 'recompose';
import { connect } from 'react-redux';
import SubmittedPage from '../SubmittedPage.tsx';

export default compose(
  connect(state => ({
    submittedEvent: state.event.submittedEvent
  }))
)(SubmittedPage);
