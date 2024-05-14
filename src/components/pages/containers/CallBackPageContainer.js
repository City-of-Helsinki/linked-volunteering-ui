import { compose } from 'recompose';
import { connect } from 'react-redux';
import { getApiAccessToken, getCurrentUserData } from '../../../ducks/auth';
import CallBackPage from '../CallBackPage';

export default compose(connect(null, { getApiAccessToken, getCurrentUserData }))(CallBackPage);
