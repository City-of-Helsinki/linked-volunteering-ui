import { compose } from 'recompose';
import { connect } from 'react-redux';
import ErrorPage from '../ErrorPage';
import { addNotification } from '../../../ducks/notification';

export default compose(connect(null, { addNotification }))(ErrorPage);
