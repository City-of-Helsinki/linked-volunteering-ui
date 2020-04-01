import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CSVLink } from 'react-csv';

import { TABLE_PAGE_SIZE } from '../../constants';
import Layout from '../layout/containers/LayoutContainer';
import Select from '../form/fields/Select';
import Table, { Td, Tr } from '../common/Table';
import Pagination from '../common/Pagination';
import IntlComponent from '../common/IntlComponent';

const FormContainer = styled(Container)`
  margin-top: 1em;
  margin-bottom: 3em;
`;

const TitleRow = styled(Row)`
  padding-top: 1.5em;
  margin-bottom: 1.5em;
`;

const ControlContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};

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
    hasOrderBy: false
  },
  { key: 'email', translation: 'report.email', hasOrderBy: false },
  { key: 'phone', translation: 'report.phone', hasOrderBy: false },
  { key: 'events', translation: 'report.events', hasOrderBy: true },
  { key: 'participants', translation: 'report.participants', hasOrderBy: true }
];

class ReportPage extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
  }

  state = {
    activePage: 1
  };

  componentDidUpdate(prevProps) {
    if (prevProps.reports !== this.props.reports) {
      this.setState({
        activePage: 1
      });
    }
  }

  handleChange = e => {
    const { getReport, apiAccessToken } = this.props;
    getReport(e.target.value, apiAccessToken);
  };

  handlePageClick = page => {
    this.setState({
      activePage: page
    });
  };

  getPaginatedReports = () => {
    const { reports } = this.props;
    const { activePage } = this.state;

    return [...reports.valueSeq()].slice(
      (activePage - 1) * TABLE_PAGE_SIZE,
      Math.min(activePage * TABLE_PAGE_SIZE, reports.size)
    );
  };

  render() {
    const {
      reports,
      setOrderBy,
      ordering,
      intl: { formatMessage }
    } = this.props;
    const { activePage } = this.state;
    const pageCount = Math.ceil((this.props.reports.size || 1) / TABLE_PAGE_SIZE);
    const paginatedReports = this.getPaginatedReports();

    const eventAmount = reports.reduce((acc, row) => acc + row.event_count, 0);
    const participantAmount = reports.reduce((acc, row) => acc + row.estimated_attendee_count, 0);

    const csvData = [
      [
        formatMessage({ id: 'site.table.header.report.area' }),
        formatMessage({ id: 'site.table.header.report.contact_person' }),
        formatMessage({ id: 'site.table.header.report.email' }),
        formatMessage({ id: 'site.table.header.report.phone' }),
        formatMessage({ id: 'site.table.header.report.events' }),
        formatMessage({ id: 'site.table.header.report.participants' })
      ],
      ...reports
        .map(report => [
          report.name,
          report.contact_person,
          report.email,
          report.phone,
          report.event_count,
          report.estimated_attendee_count
        ])
        .values()
    ];

    return (
      <Layout>
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
              <Select id="area" label="form.report.field.year.label" onChange={this.handleChange}>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
              </Select>
            </Col>
            {reports.size > 0 && (
              <Col sm={{ size: 4 }}>
                <CSVLink
                  filename={'Linked Volunteering - Report.csv'}
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
                setOrderBy={setOrderBy}
                ordering={ordering}
              >
                {paginatedReports &&
                  paginatedReports.map(report => (
                    <Tr key={report.id}>
                      <Td>{report.name}</Td>
                      <Td>{report.contact_person}</Td>
                      <Td>{report.email}</Td>
                      <Td>{report.phone}</Td>
                      <Td>{report.event_count}</Td>
                      <Td>{report.estimated_attendee_count}</Td>
                    </Tr>
                  ))}
              </Table>
              <Pagination
                activePage={activePage}
                onPageClick={this.handlePageClick}
                pageCount={pageCount}
              />
            </Col>
          </Row>
        </FormContainer>
      </Layout>
    );
  }
}

export default injectIntl(ReportPage);
