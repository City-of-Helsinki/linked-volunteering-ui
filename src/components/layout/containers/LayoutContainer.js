// @flow

import { connect } from 'react-redux';
import Layout from '../Layout';
import type { Store } from '../../../types/redux';

export default connect(
  (state: Store) => ({
    user: state.oidc.get('user')
  }),
  {}
)(Layout);
