import { connect } from 'react-redux';
import { compose } from 'recompose';
import { renderIfAuthenticated, orderBy } from '../../../utils/container';
import { getReport, setOrderBy } from '../../../ducks/report';
import ReportPage from '../ReportPage';

export default compose(
  renderIfAuthenticated,
  connect(
    (state) => ({
      reports: state.report.reports,
      ordering: state.report.ordering,
      apiAccessToken: state.auth.apiAccessToken,
    }),
    { getReport, setOrderBy },
  ),
  orderBy('reports'),
)(ReportPage);
