// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import LocalizedLink from '../../common/LocalizedLink';
import Layout from '../../layout/Layout';

import type { Events } from '../../../types/event';

type Props = {
  events: Events
};

const Wrapper = styled.div`
  margin-bottom: 3em;
`;

class EventsPage extends PureComponent<Props> {
  componentDidMount() {
    const { getEvents } = this.props;
    getEvents();
  }

  render() {
    const { events } = this.props;
    return (
      <Layout>
        <Wrapper>
          {events && (
            <table>
              <tbody>
                {events.valueSeq().map(event => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td>
                      <LocalizedLink to={`event/modify/${event.id}`}>{event.name}</LocalizedLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Wrapper>
      </Layout>
    );
  }
}

export default EventsPage;
