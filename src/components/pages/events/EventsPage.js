import React, { PureComponent } from 'react';
import LocalizedLink from '../../common/LocalizedLink';
import Layout from '../../layout/Layout';

class EventsPage extends PureComponent {
  componentDidMount() {
    const { getEvents } = this.props;
    getEvents();
  }

  render() {
    const { events } = this.props;
    return (
      <Layout>
        <ul>
          {events &&
            events.valueSeq().map(event => (
              <li key={event.id}>
                <LocalizedLink to={`event/modify/${event.id}`}>{event.name}</LocalizedLink>
              </li>
            ))}
        </ul>
      </Layout>
    );
  }
}

export default EventsPage;
