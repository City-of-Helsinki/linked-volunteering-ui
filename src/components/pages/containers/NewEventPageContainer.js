import { injectIntl } from 'react-intl';
import { compose, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';

import { submit } from '../../../ducks/event';
import { withEventForm } from '../../form/withForm';
import NewEventPage from '../NewEventPage';
import ThankYouPage from '../ThankYouPage';

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
  withEventForm,
  branch(props => props.submitted, renderComponent(ThankYouPage))
)(NewEventPage);
