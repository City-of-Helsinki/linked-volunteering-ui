// @flow

import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import { Button, Container, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import LocalizedLink from '../../common/LocalizedLink';
import IntlComponent from '../../common/IntlComponent';
import { Table, Td, FirstTd, TrRow } from '../../common/Table';
import Icon from '../../common/Icon';

import Layout from '../../layout/containers/LayoutContainer';

import type { Events } from '../../../types/event';

const DetailsTr = styled.tr`
  background-color: white;
`;

const Details = ({ children }) => (
  <DetailsTr>
    <FirstTd />
    <Td colSpan={7} large>
      {children}
    </Td>
  </DetailsTr>
);

const DetailsCluster = styled.div`
  display: flex;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  * + * {
    margin-left: 1em;
  }
`;

const SpacedSpan = styled.span`
  margin-left: 0.5em;
`;

const HeaderText = styled.span`
  margin-right: 0.5em;
`;

const ErrorButton = styled(Button)`
  && > * {
    color: ${props => props.theme.themeColors.danger};
  }
  * + * {
    margin-left: 0.5em;
  }
`;

type Props = {
  events: Events,
  // flowlint-next-line unclear-type:off
  getEvents: Function,
  // flowlint-next-line unclear-type:off
  remove: Function,
  // flowlint-next-line unclear-type:off
  approve: Function
};

type State = {
  visible: ?string
};

class EventsPage extends PureComponent<Props, State> {
  state = {
    visible: null
  };

  componentDidMount() {
    const { getEvents } = this.props;
    getEvents();
  }

  toggleDetails = (id: string) =>
    this.setState(({ visible }) => ({ visible: visible === id ? null : id }));

  render() {
    const { events, remove, approve } = this.props;
    const { visible } = this.state;
    return (
      <Layout paddingTop paddingBottom>
        {events && (
          <Container>
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th />
                      <th>
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.name"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </th>
                      <th>
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.organizer"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </th>
                      <th>
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.start_date"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </th>
                      <th>
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.created"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </th>
                      <th>
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.state"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </th>
                      <th colSpan="2" />
                    </tr>
                  </thead>
                  <tbody>
                    {events.valueSeq().map(event => {
                      const selected = visible === event.id;
                      return (
                        <Fragment key={event.id}>
                          <TrRow selected={selected}>
                            <FirstTd selected={event.state === 'pending'} />
                            <Td>{event.name}</Td>
                            <Td>{event.organizer_email}</Td>
                            <Td>{event.start_time}</Td>
                            <Td>{event.created_at}</Td>
                            <Td>
                              <Icon
                                inline
                                name="oval"
                                height="0.5em"
                                width="0.5em"
                                color={event.state === 'pending' ? 'orange' : 'green'}
                              />
                              <SpacedSpan>{event.state}</SpacedSpan>
                            </Td>
                            <Td>
                              <LocalizedLink to={`event/modify/${event.id}`}>
                                <Icon inline name="pencil" height="1em" width="1em" />
                                <IntlComponent
                                  Component={SpacedSpan}
                                  id="site.page.manage_events.table.action.edit"
                                />
                              </LocalizedLink>
                            </Td>
                            <Td>
                              <Button color="link" onClick={() => this.toggleDetails(event.id)}>
                                <Icon
                                  name="angleRight"
                                  height="2em"
                                  width="2em"
                                  rotate={selected ? 90 : 0}
                                />
                              </Button>
                            </Td>
                          </TrRow>
                          {selected && (
                            <Details>
                              <DetailsCluster>
                                <Icon name="user" height="1em" width="1em" />
                                <strong>
                                  {event.organizer_first_name} {event.organizer_last_name}
                                </strong>
                                <span>{event.organizer_email}</span>
                              </DetailsCluster>
                              <DetailsCluster>
                                <Icon name="mapMarker" height="0.8em" width="0.8em" />
                                <strong>Osoitejuttu?</strong>
                              </DetailsCluster>
                              <p>{event.description}</p>
                              <div>
                                <IntlComponent
                                  Component={Button}
                                  id="site.page.manage_events.table.action.approve"
                                  color="primary"
                                  onClick={() => approve(event)}
                                />
                                <ErrorButton color="link" onClick={() => remove(event)}>
                                  <FormattedMessage id="site.page.manage_events.table.action.remove" />
                                  <Icon inline name="times" height="1em" width="1em" />
                                </ErrorButton>
                              </div>
                            </Details>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        )}
      </Layout>
    );
  }
}

export default EventsPage;
