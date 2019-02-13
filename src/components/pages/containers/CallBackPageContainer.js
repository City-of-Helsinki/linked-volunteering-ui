import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getApiAccessToken } from '../../../ducks/auth';
import CallBackPage from '../CallBackPage';

export default compose(
  withRouter,
  connect(
    null,
    { getApiAccessToken }
  )
)(CallBackPage);
