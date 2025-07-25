import React, { useState, useEffect, Fragment, useMemo } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { isEmpty } from 'lodash';
import {
  contractZonesSelector,
  getContractZones,
} from '../../../store/reducers/contractZones';
import {
  eventsSelector,
  getEvents,
  nextParamsSelector,
  orderingSelector,
  publishEvent,
  setFilterByContractZone,
  setOrderBy,
} from '../../../store/reducers/event';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addNotification } from '../../../store/reducers/notifications';
import { openModal } from '../../../store/reducers/modal';
import PageMeta from '../PageMeta';
import LocalizedLink from '../../common/LocalizedLink';
import IntlComponent from '../../common/IntlComponent';
import Table, { StyledTd, Tr, DetailsRow } from '../../common/Table';
import Button from '../../common/Button';
import { WithIcons } from '../../common/Icon';
import ContractZones from '../../common/ContractZones';
import Layout from '../../layout/Layout';
import { isPending } from '../../../utils/event';
import useAuth from '../../../hooks/useAuth';
import { Event } from '../../../store/types';
import { isOfficialSelector } from '../../../store/reducers/auth';

const DetailsCluster = styled.div`
  display: flex;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  * + * {
    margin-left: 1em;
  }
`;

const FormContainer = styled(Container)`
  margin-top: 1em;
  margin-bottom: 3em;
`;

const TitleRow = styled(Row)`
  padding-top: 1.5em;
  margin-bottom: 1.5em;
`;

const ControlContainer = styled(Container)`
  background-color: ${(props) => props.theme.helWhite};
  padding-bottom: 2em;

  h1 {
    font-size: var(--hds-text-xxl);
    margin: 0 0 0.5rem;
  }
`;

const FilterTitle = styled.span`
  font-weight: 600;
  margin-right: 1em;
`;

const ButtonControls = styled(Col)`
  text-align: center;
`;

const NextPageButton = styled(Button)`
  margin-top: 1em;
`;

const EventName = styled.span`
  overflow-wrap: break-word;
  word-break: break-word;
`;

const tableHeaders = [
  { key: 'name', translation: 'manage_events.name', hasOrderBy: true },
  {
    key: 'organizer_email',
    translation: 'manage_events.organizer_email',
    hasOrderBy: true,
  },
  {
    key: 'start_time',
    translation: 'manage_events.start_time',
    hasOrderBy: true,
  },
  {
    key: 'created_at',
    translation: 'manage_events.created_at',
    hasOrderBy: true,
  },
  { key: 'state', translation: 'manage_events.state', hasOrderBy: true },
];

const ManageEventsPage = () => {
  const [visible, setVisible] = useState<number | null>(null);

  const { getApiToken } = useAuth();
  const dispatch = useAppDispatch();

  const contractZones = useAppSelector(contractZonesSelector);
  const nextParams = useAppSelector(nextParamsSelector);
  const events = useAppSelector(eventsSelector);
  const ordering = useAppSelector(orderingSelector);
  const isOfficial = useAppSelector(isOfficialSelector);

  const apiAccessToken = getApiToken();

  const sortedEvents = useMemo(() => {
    const eventArray = [...Object.values(events)];
    if (!ordering.key) return eventArray;

    return eventArray.sort((a, b) => {
      const key = ordering.key as keyof Event;
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === bValue) return 0;
      // Sorting logic: `null` and `undefined` values are always placed last.
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return ordering.order === 'DESC' ? -comparison : comparison;
    });
  }, [events, ordering]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (apiAccessToken) {
      if (isEmpty(contractZones)) {
        dispatch(getContractZones(apiAccessToken));
      }

      if (isEmpty(events)) {
        dispatch(getEvents({ params: nextParams, apiAccessToken }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiAccessToken]);

  const toggleDetails = (id: number) => {
    setVisible(visible === id ? null : id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterBy = parseInt(e.target.value, 10);

    dispatch(setFilterByContractZone(filterBy));
  };

  const handleNextEvents = () => {
    if (apiAccessToken) {
      dispatch(getEvents({ params: nextParams, apiAccessToken }));
    }
  };

  const approve = async (event: Event) => {
    await dispatch(publishEvent({ event, apiAccessToken }));
    dispatch(
      addNotification({
        color: 'success',
        message: 'notification.manage_events.approve',
        values: { name: event.name },
      })
    );
  };

  const remove = (event: Event) => {
    dispatch(
      openModal({
        modal: 'confirmRemoval',
        meta: { event, apiAccessToken },
      })
    );
  };

  if (!apiAccessToken) {
    return null;
  }

  return (
    <Layout>
      <PageMeta title="site.page.manage_events.page_title" />
      <ControlContainer fluid>
        <TitleRow>
          <Col sm={{ size: 11, offset: 1 }}>
            <FormattedMessage tagName="h1" id="site.page.manage_events.title" />
          </Col>
        </TitleRow>
        <Row>
          <Col sm={{ size: 4, offset: 1 }}>
            <IntlComponent
              Component={FilterTitle}
              id="site.page.manage_events.filter_events"
            />
            <ContractZones
              onChange={handleChange}
              contractZones={contractZones}
            />
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
              setOrderBy={(order: { key: string; order: string }) =>
                dispatch(setOrderBy(order))
              }
              ordering={ordering}
            >
              {sortedEvents.map((event) => {
                const selected = visible === event.id;
                const isEventPending = isPending(event);
                return (
                  <Fragment key={event.id}>
                    <Tr
                      firstColumn
                      highlighted={isEventPending}
                      selected={selected}
                    >
                      <StyledTd>
                        <EventName>{event.name}</EventName>
                      </StyledTd>
                      <StyledTd>{event.organizer_email}</StyledTd>
                      <StyledTd>
                        <FormattedDate value={event.start_time} />
                      </StyledTd>
                      <StyledTd>
                        <FormattedDate value={event.created_at} />
                      </StyledTd>
                      <WithIcons
                        component={StyledTd}
                        prepend={{
                          name: 'oval',
                          size: '0.5x',
                          color: isEventPending ? 'orange' : 'green',
                        }}
                        append={undefined}
                      >
                        <FormattedMessage
                          id={`entities.event.state.${event.state}`}
                        />
                      </WithIcons>
                      <StyledTd>
                        <LocalizedLink
                          id={`edit_event_${event.id}`}
                          to={`admin/event/modify/${event.id}`}
                          prepend="pencil"
                          translate="site.page.manage_events.table.action.edit"
                        />
                      </StyledTd>
                      <StyledTd>
                        <Button
                          id={`extend_event_${event.id}`}
                          data-testid="toggle-details"
                          color="link"
                          onClick={() => toggleDetails(event.id)}
                          prepend={{
                            name: 'angleRight',
                            size: '2x',
                            rotate: selected ? 90 : 0,
                          }}
                        />
                      </StyledTd>
                    </Tr>
                    {selected && (
                      <DetailsRow id={`event_details_${event.id}`} colSpan={7}>
                        <WithIcons
                          component={DetailsCluster}
                          prepend="user"
                          append={undefined}
                        >
                          <strong>
                            {event.organizer_first_name}{' '}
                            {event.organizer_last_name}
                          </strong>
                          <span>{event.organizer_email}</span>
                        </WithIcons>
                        <WithIcons
                          component={DetailsCluster}
                          prepend="mapMarker"
                          append={undefined}
                        >
                          <strong>{event.maintenance_location}</strong>
                        </WithIcons>
                        <p>{event.description}</p>
                        <div>
                          {!!isEventPending && (
                            <Button
                              id={`approve_event_${event.id}`}
                              translate="site.page.manage_events.table.action.approve"
                              color="primary"
                              onClick={() => approve(event)}
                              disabled={!isEventPending}
                            />
                          )}

                          {isOfficial && (
                            <Button
                              id={`reject_event_${event.id}`}
                              data-testid={`reject_event_${event.id}`}
                              translate="site.page.manage_events.table.action.remove"
                              color="danger"
                              onClick={() => remove(event)}
                              append="times"
                            />
                          )}
                        </div>
                      </DetailsRow>
                    )}
                  </Fragment>
                );
              })}
            </Table>
          </Col>
        </Row>
        <Row>
          <ButtonControls>
            {Object.keys(nextParams).length > 0 && (
              <NextPageButton
                data-testid="next-page"
                translate="site.page.manage_events.next_events"
                color="info"
                onClick={() => handleNextEvents()}
              />
            )}
          </ButtonControls>
        </Row>
      </FormContainer>
    </Layout>
  );
};

export default ManageEventsPage;
