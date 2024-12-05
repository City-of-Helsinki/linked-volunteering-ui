import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { CSVLink } from 'react-csv';

import range from 'lodash/range';
import { REPORTS_START_YEAR, TABLE_PAGE_SIZE } from '../../constants';
import PageMeta from './PageMeta';
import Layout from '../layout/Layout';
import Select from '../form/fields/Select';
import Table, { Td, Tr } from '../common/Table';
import Pagination from '../common/Pagination';
import IntlComponent from '../common/IntlComponent';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getReport, reportsSelector, setOrderBy } from '../../store/reducers/report';
import { orderingSelector } from '../../store/reducers/event';

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

  h1 {
    font-size: var(--hds-text-xxl);
    margin: 0 0 0.5rem;
  }
`;

const ReportTitle = styled.span`
  font-weight: 600;
`;

const StatisticsRow = styled(Row)`
  padding-top: 1.5em;
  padding-bottom: 1.5em;
`;

const tableHeaders = [
  { key: 'area', translation: 'report.area', hasOrderBy: false },
  {
    key: 'contact_person',
    translation: 'report.contact_person',
    hasOrderBy: false,
  },
  { key: 'email', translation: 'report.email', hasOrderBy: false },
  { key: 'phone', translation: 'report.phone', hasOrderBy: false },
  { key: 'events', translation: 'report.events', hasOrderBy: true },
  { key: 'participants', translation: 'report.participants', hasOrderBy: true },
];

const yearOptions = range(REPORTS_START_YEAR, new Date().getFullYear() + 2).map((year) => (
  <option key={year} value={year}>
    {year}
  </option>
));

const ReportPage = () => {
  const [activePage, setActivePage] = useState(1);

  const { getApiToken } = useAuth();
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const apiAccessToken = getApiToken();

  const reports = useAppSelector(reportsSelector);
  const ordering = useAppSelector(orderingSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!reports) {
      setActivePage(1);
    }
  }, [reports]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getReport({ year: e.target.value, apiAccessToken }));
  };

  const setOrder = (rule: { key: string; order: string }) => {
    dispatch(setOrderBy(rule));
  };

  const handlePageClick = (page: number) => {
    setActivePage(page);
  };

  const getPaginatedReports = () => {
    const reportsKeys = Object.keys(reports);

    return reportsKeys.slice(
      (activePage - 1) * TABLE_PAGE_SIZE,
      Math.min(activePage * TABLE_PAGE_SIZE, reportsKeys.length),
    );
  };

  const pageCount = Math.ceil((Object.keys(reports).length || 1) / TABLE_PAGE_SIZE);
  const paginatedReports = getPaginatedReports();

  const eventAmount = Object.keys(reports).reduce((acc, key) => acc + reports[key].event_count, 0);
  const participantAmount = Object.keys(reports).reduce(
    (acc, key) => acc + reports[key].estimated_attendee_count,
    0,
  );

  const csvData = [
    [
      intl.formatMessage({ id: 'site.table.header.report.area' }),
      intl.formatMessage({ id: 'site.table.header.report.contact_person' }),
      intl.formatMessage({ id: 'site.table.header.report.email' }),
      intl.formatMessage({ id: 'site.table.header.report.phone' }),
      intl.formatMessage({ id: 'site.table.header.report.events' }),
      intl.formatMessage({ id: 'site.table.header.report.participants' }),
    ],
    Object.keys(reports)
      .map((key) => [
        reports[key].name,
        reports[key].contact_person,
        reports[key].email,
        reports[key].phone,
        reports[key].event_count,
        reports[key].estimated_attendee_count,
      ])
      .values(),
  ];

  return (
    <Layout>
      <PageMeta title="site.report.page_title" />
      <ControlContainer fluid>
        <TitleRow>
          <Col sm={{ size: 11, offset: 1 }}>
            <FormattedMessage tagName="h1" id="site.report.title" />
          </Col>
        </TitleRow>
        <Row>
          <Col sm={{ size: 2, offset: 1 }}>
            <IntlComponent Component={ReportTitle} id="site.report.yearly_report" />
          </Col>
          <Col sm={{ size: 4 }}>
            <Select
              id="area"
              label="form.report.field.year.label"
              onChange={handleChange}
              noneSelectedText=""
            >
              {yearOptions}
            </Select>
          </Col>
          {Object.keys(reports).length > 0 && (
            <Col sm={{ size: 4 }}>
              <CSVLink
                filename="Linked Volunteering - Report.csv"
                className="btn btn-info"
                data={csvData}
              >
                <FormattedMessage tagName="span" id="site.report.download" />
              </CSVLink>
            </Col>
          )}
        </Row>
        <StatisticsRow>
          <IntlComponent
            Component={Col}
            sm={{ size: 2, offset: 1 }}
            id="site.report.total_events"
            values={{ event_amount: eventAmount }}
          />
          <IntlComponent
            Component={Col}
            sm={{ size: 2, offset: 1 }}
            id="site.report.total_participants"
            values={{ participant_amount: participantAmount }}
          />
        </StatisticsRow>
      </ControlContainer>
      <FormContainer>
        <Row>
          <Col>
            <Table
              id="report_table"
              headers={tableHeaders}
              setOrderBy={setOrder}
              ordering={ordering}
              firstColumn={undefined}
              actionColSpan={undefined}
            >
              {paginatedReports?.map((key) => (
                <Tr key={reports[key].id} firstColumn={undefined} highlighted={undefined}>
                  <Td>{reports[key].name}</Td>
                  <Td>{reports[key].contact_person}</Td>
                  <Td>{reports[key].email}</Td>
                  <Td>{reports[key].phone}</Td>
                  <Td>{reports[key].event_count}</Td>
                  <Td>{reports[key].estimated_attendee_count}</Td>
                </Tr>
              ))}
            </Table>
            <Pagination
              activePage={activePage}
              onPageClick={handlePageClick}
              pageCount={pageCount}
            />
          </Col>
        </Row>
      </FormContainer>
    </Layout>
  );
};

export default ReportPage;
