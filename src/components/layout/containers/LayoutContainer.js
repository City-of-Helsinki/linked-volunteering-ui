import { connect } from 'react-redux';
import Layout from '../Layout';

export default connect(
  state => ({
    user: state.oidc.get('user')
  }),
  {}
)(Layout);
