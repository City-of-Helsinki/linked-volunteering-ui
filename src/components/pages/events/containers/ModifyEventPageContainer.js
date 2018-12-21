// @flow
import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { renderIfAuthenticated } from '../../../../utils/container';
import { addNotification } from '../../../../ducks/notification';
import eventService from '../../../../services/eventService';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';
import type { Store } from '../../../../types/redux';

type ModifyProps = {
  pageType: string,
  id: string,
  locale: string
};

export default compose(
  renderIfAuthenticated,
  // flowlint-next-line unclear-type:off
  withProps<any, ModifyProps>((props: any) => ({
    pageType: 'modify',
    id: props.match.params.id,
    locale: props.match.params.locale
  })),
  connect(
    (state: Store, { id }) => ({
      initialValues: state.event.events.get(id)
    }),
    { addNotification }
  ),
  withHandlers({
    onSubmit: ({ history, locale, addNotification: notify }) => async values => {
      await eventService.modify(values);
      history.push(`/${locale}/events/manage`);
      notify({ color: 'success', message: 'notification.form.event.modified' });
    }
  }),
  injectIntl,
  withEventForm
)(EventPage);
