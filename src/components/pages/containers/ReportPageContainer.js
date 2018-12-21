import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withReportForm } from '../../form/withForm';
import { getReport } from '../../../ducks/report';
import ReportPage from '../ReportPage';

export default compose(
  withReportForm,
  connect(
    state => ({
      reports: state.report.reports
    }),
    { getReport }
  )
)(ReportPage);
