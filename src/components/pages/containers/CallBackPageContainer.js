import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getApiAccessToken, getCurrentUserData } from '../../../ducks/auth';
import CallBackPage from '../CallBackPage';

export default compose(
  withRouter,
  connect(
    null,
    { getApiAccessToken, getCurrentUserData }
  )
)(CallBackPage);
