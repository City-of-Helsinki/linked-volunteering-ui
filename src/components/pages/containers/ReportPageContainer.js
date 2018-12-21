// @flow

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { renderIfAuthenticated } from '../../../utils/container';
import { withReportForm } from '../../form/withForm';
import { getReport } from '../../../ducks/report';
import ReportPage from '../ReportPage';
import type { Store } from '../../../types/redux';

export default compose(
  renderIfAuthenticated,
  withReportForm,
  connect(
    (state: Store) => ({
      reports: state.report.reports
    }),
    { getReport }
  )
)(ReportPage);
