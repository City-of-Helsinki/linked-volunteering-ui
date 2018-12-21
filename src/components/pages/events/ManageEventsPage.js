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
import type { Districts } from '../../../types/district';

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

type Props = {
  events: Events,
  // flowlint-next-line unclear-type:off
  districts: Districts,
  // flowlint-next-line unclear-type:off
  filteredEvents: Events,
  // flowlint-next-line unclear-type:off
  getEvents: Function,
  // flowlint-next-line unclear-type:off
  getDistricts: Function,
  // flowlint-next-line unclear-type:off
  remove: Function,
  // flowlint-next-line unclear-type:off
  approve: Function,
  // flowlint-next-line unclear-type:off
  setFilterByDistrict: Function
};

type State = {
  visible: ?string
};

class EventsPage extends PureComponent<Props, State> {
  state = {
    visible: null
  };

  componentDidMount() {
    const { getDistricts, getEvents } = this.props;
    getDistricts();
    getEvents();
  }

  toggleDetails = (id: string) =>
    this.setState(({ visible }) => ({ visible: visible === id ? null : id }));

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { setFilterByDistrict } = this.props;
    setFilterByDistrict(e.target.value);
  };

  render() {
    const { events, districts, remove, approve } = this.props;
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
              <select onChange={this.handleChange}>
                <option value="" />
                {districts.map(district => (
                  <option key={district.name.fi} value={district.name.fi}>
                    {district.name.fi}
                  </option>
                ))}
              </select>
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
                          <Td>{event.email}</Td>
                          <Td>{event.startdate}</Td>
                          <Td>{event.created}</Td>
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
                                {event.first_name} {event.last_name}
                              </strong>
                              <span>{event.email}</span>
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
