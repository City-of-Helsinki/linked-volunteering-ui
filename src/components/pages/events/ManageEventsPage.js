import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import LocalizedLink from '../../common/LocalizedLink';
import IntlComponent from '../../common/IntlComponent';
import Table, { Td, Tr, DetailsRow } from '../../common/Table';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import Neighborhoods from '../../common/Neighborhoods';

import Layout from '../../layout/containers/LayoutContainer';

import { isPending } from '../../../utils/event';

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

const tableHeaders = [
  { key: 'name', translation: 'manage_events.name', hasOrderBy: true },
  {
    key: 'organizer_email',
    translation: 'manage_events.organizer_email',
    hasOrderBy: true
  },
  { key: 'start_time', translation: 'manage_events.start_time', hasOrderBy: true },
  { key: 'created_at', translation: 'manage_events.created_at', hasOrderBy: true },
  { key: 'state', translation: 'manage_events.state', hasOrderBy: true }
];

class EventsPage extends PureComponent {
  state = {
    visible: null
  };

  componentDidMount() {
    const { neighborhoods, getNeighborhoods, getEvents } = this.props;
    if (neighborhoods.size === 0) {
      getNeighborhoods();
    }
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
              <Table
                id="manage_event_table"
                firstColumn
                headers={tableHeaders}
                actionColSpan={2}
                setOrderBy={setOrderBy}
                ordering={ordering}
              >
                {events.valueSeq().map(event => {
                  const selected = visible === event.id;
                  const isEventPending = isPending(event);
                  return (
                    <Fragment key={event.id}>
                      <Tr firstColumn highlighted={isEventPending} selected={selected}>
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
                            name="oval"
                            size="0.5x"
                            color={isEventPending ? 'orange' : 'green'}
                          />
                          <IntlComponent
                            Component={SpacedSpan}
                            id={`entities.event.state.${event.state}`}
                          />
                        </Td>
                        <Td>
                          <LocalizedLink
                            to={`event/modify/${event.id}`}
                            prepend="pencil"
                            id="site.page.manage_events.table.action.edit"
                          />
                        </Td>
                        <Td>
                          <Button color="link" onClick={() => this.toggleDetails(event.id)}>
                            <Icon name="angleRight" size="2x" rotate={selected ? 90 : 0} />
                          </Button>
                        </Td>
                      </Tr>
                      {selected && (
                        <DetailsRow id={`event_details_${event.id}`} colSpan={7}>
                          <DetailsCluster>
                            <Icon name="user" />
                            <strong>
                              {event.organizer_first_name} {event.organizer_last_name}
                            </strong>
                            <span>{event.organizer_email}</span>
                          </DetailsCluster>
                          <DetailsCluster>
                            <Icon name="mapMarker" size="0.5x" />
                            <strong>Osoitejuttu?</strong>
                          </DetailsCluster>
                          <p>{event.description}</p>
                          <div>
                            <Button
                              id="site.page.manage_events.table.action.approve"
                              color="primary"
                              onClick={() => approve(event)}
                            />
                            <Button
                              id="site.page.manage_events.table.action.remove"
                              color="danger"
                              onClick={() => remove(event)}
                              append="times"
                            />
                          </div>
                        </DetailsRow>
                      )}
                    </Fragment>
                  );
                })}
              </Table>
            </Col>
          </Row>
        </FormContainer>
      </Layout>
    );
  }
}

export default EventsPage;
