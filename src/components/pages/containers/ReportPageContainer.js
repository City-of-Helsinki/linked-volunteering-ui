import { injectIntl } from 'react-intl';
import { withReportForm } from '../../form/withForm';
import ReportPage from '../ReportPage';

export default injectIntl(withReportForm(ReportPage));
