import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import { Button, Container, Row, Col } from 'reactstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import LocalizedLink from '../../common/LocalizedLink';
import IntlComponent from '../../common/IntlComponent';
import { Table, Td, Th, FirstTd, TrRow } from '../../common/Table';
import Icon from '../../common/Icon';
import Neighborhoods from '../../common/Neighborhoods';

import Layout from '../../layout/containers/LayoutContainer';

import { isPending } from '../../../utils/event';

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

const FormContainer = styled(Container)`
  margin-top: 1em;
  margin-bottom: 3em;
`;

const TitleRow = styled(Row)`
  margin-top: 1.5em;
  margin-bottom: 1.5em;
`;

const ControlContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
  padding-bottom: 2em;

  h3 {
    margin-top: 0em;
  }
`;

const FilterTitle = styled.span`
  font-weight: 600;
  margin-right: 1em;
`;

class EventsPage extends PureComponent {
  state = {
    visible: null
  };

  componentDidMount() {
    const { getNeighborhoods, getEvents } = this.props;
    getNeighborhoods();
    getEvents();
  }

  toggleDetails = id => this.setState(({ visible }) => ({ visible: visible === id ? null : id }));

  handleChange = e => {
    const { setFilterByNeighborhood } = this.props;
    setFilterByNeighborhood(e.target.value);
  };

  render() {
    const { events, neighborhoods, remove, approve, setOrderBy, ordering } = this.props;
    const { visible } = this.state;

    return (
      <Layout>
        <ControlContainer fluid>
          <TitleRow>
            <Col sm={{ size: 11, offset: 1 }}>
              <FormattedMessage tagName="h2" id="site.page.manage_events.title" />
            </Col>
          </TitleRow>
          <Row>
            <Col sm={{ size: 4, offset: 1 }}>
              <IntlComponent Component={FilterTitle} id="site.page.manage_events.filter_events" />
              <Neighborhoods onChange={this.handleChange} neighborhoods={neighborhoods} />
            </Col>
          </Row>
        </ControlContainer>
        <FormContainer>
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th />
                    <Th>
                      <Button
                        block
                        color="link"
                        onClick={() =>
                          setOrderBy({
                            key: 'name',
                            order:
                              ordering.key === 'name' && ordering.order !== 'ASC' ? 'ASC' : 'DESC'
                          })
                        }
                      >
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.name"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </Button>
                    </Th>
                    <Th>
                      <Button
                        block
                        color="link"
                        onClick={() =>
                          setOrderBy({
                            key: 'organizer_email',
                            order:
                              ordering.key === 'organizer_email' && ordering.order !== 'ASC'
                                ? 'ASC'
                                : 'DESC'
                          })
                        }
                      >
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.organizer"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </Button>
                    </Th>
                    <Th>
                      <Button
                        block
                        color="link"
                        onClick={() =>
                          setOrderBy({
                            key: 'start_time',
                            order:
                              ordering.key === 'start_time' && ordering.order !== 'ASC'
                                ? 'ASC'
                                : 'DESC'
                          })
                        }
                      >
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.start_date"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </Button>
                    </Th>
                    <Th>
                      <Button
                        block
                        color="link"
                        onClick={() =>
                          setOrderBy({
                            key: 'created_at',
                            order:
                              ordering.key === 'created_at' && ordering.order !== 'ASC'
                                ? 'ASC'
                                : 'DESC'
                          })
                        }
                      >
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.created"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </Button>
                    </Th>
                    <Th>
                      <Button
                        block
                        color="link"
                        onClick={() =>
                          setOrderBy({
                            key: 'state',
                            order:
                              ordering.key === 'state' && ordering.order !== 'ASC' ? 'ASC' : 'DESC'
                          })
                        }
                      >
                        <IntlComponent
                          Component={HeaderText}
                          id="site.page.manage_events.table.header.state"
                        />
                        <Icon inline name="order" height="1em" width="1em" />
                      </Button>
                    </Th>
                    <Th colSpan="2" />
                  </tr>
                </thead>
                <tbody>
                  {events.valueSeq().map(event => {
                    const selected = visible === event.id;
                    const isEventPending = isPending(event);
                    return (
                      <Fragment key={event.id}>
                        <TrRow selected={selected}>
                          <FirstTd selected={isEventPending} />
                          <Td>{event.name}</Td>
                          <Td>{event.organizer_email}</Td>
                          <Td>
                            <FormattedDate value={event.start_time} />
                          </Td>
                          <Td>
                            <FormattedDate value={event.created_at} />
                          </Td>
                          <Td>
                            <Icon
                              inline
                              name="oval"
                              height=".5em"
                              width=".5em"
                              color={isEventPending ? 'orange' : 'green'}
                            />
                            <IntlComponent
                              Component={SpacedSpan}
                              id={`entities.event.state.${event.state}`}
                            />
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
        </FormContainer>
      </Layout>
    );
  }
}

export default EventsPage;
