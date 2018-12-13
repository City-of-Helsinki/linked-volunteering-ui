// @flow

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withReportForm } from '../../form/withForm';
import { getEvents } from '../../../ducks/event';
import ReportPage from '../ReportPage';
import type { Store } from '../../../types/redux';

export default compose(
  withReportForm,
  connect(
    (state: Store) => ({
      events: state.event.events
    }),
    { getEvents }
  )
)(ReportPage);
