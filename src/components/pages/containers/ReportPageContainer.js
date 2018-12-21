import { connect } from 'react-redux';
import { compose } from 'recompose';
import { renderIfAuthenticated } from '../../../utils/container';
import { withReportForm } from '../../form/withForm';
import { getReport } from '../../../ducks/report';
import ReportPage from '../ReportPage';

export default compose(
  renderIfAuthenticated,
  withReportForm,
  connect(
    state => ({
      reports: state.report.reports
    }),
    { getReport }
  )
)(ReportPage);
