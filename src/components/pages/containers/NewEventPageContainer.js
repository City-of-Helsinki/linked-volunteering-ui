import { injectIntl } from 'react-intl';
import { withEventForm } from '../../form/withForm';
import NewEventPage from '../NewEventPage';

export default injectIntl(withEventForm(NewEventPage));
