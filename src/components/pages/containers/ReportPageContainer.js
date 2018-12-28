import { connect } from 'react-redux';
import { compose } from 'recompose';
import { renderIfAuthenticated, orderBy } from '../../../utils/container';
import { withReportForm } from '../../form/withForm';
import { getReport, setOrderBy } from '../../../ducks/report';
import ReportPage from '../ReportPage';

export default compose(
  renderIfAuthenticated,
  withReportForm,
  connect(
    state => ({
      reports: state.report.reports,
      ordering: state.report.ordering
    }),
    { getReport, setOrderBy }
  ),
  orderBy('reports')
)(ReportPage);
