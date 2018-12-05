import { injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { submit } from '../../../ducks/event';
import { withEventForm } from '../../form/withForm';
import NewEventPage from '../NewEventPage';

export default compose(
  connect(
    state => ({
      submitted: state.event.submitted
    }),
    {
      submit
    }
  ),
  injectIntl,
  withEventForm
)(NewEventPage);
