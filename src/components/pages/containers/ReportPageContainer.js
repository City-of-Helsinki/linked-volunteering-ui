// @flow

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withReportForm } from '../../form/withForm';
import { getReport } from '../../../ducks/report';
import ReportPage from '../ReportPage';
import type { Store } from '../../../types/redux';

export default compose(
  withReportForm,
  connect(
    (state: Store) => ({
      reportRows: state.report.reportRows
    }),
    { getReport }
  )
)(ReportPage);
