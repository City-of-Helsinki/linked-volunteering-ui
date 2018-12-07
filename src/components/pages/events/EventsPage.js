import React, { PureComponent } from 'react';
import LocalizedLink from '../../common/LocalizedLink';
import Layout from '../../layout/Layout';

class EventsPage extends PureComponent {
  componentDidMount() {
    const { events, getEvents } = this.props;
    if (!events) {
      getEvents();
    }
  }

  render() {
    const { events } = this.props;
    if (!events) return null;
    return (
      <Layout>
        <ul>
          {events.results.valueSeq().map(event => (
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
