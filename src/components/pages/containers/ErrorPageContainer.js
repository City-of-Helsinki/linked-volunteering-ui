import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ErrorPage from '../ErrorPage';
import { addNotification } from '../../../ducks/notification';

export default compose(withRouter, connect(null, { addNotification }))(ErrorPage);
