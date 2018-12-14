// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'reactstrap';
import { FormattedMessage, type intlShape } from 'react-intl';

import Layout from '../layout/Layout';
import ReportForm from '../form/ReportForm';

import { Table, Td, TrRow } from '../common/Table';
import IntlComponent from '../common/IntlComponent';

import type { WithForm } from '../../types/forms';
import type { ReportRow } from '../../types/report';

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

  h3 {
    margin-top: 0em;
  }
`;

const ReportTitle = styled.span`
  font-weight: 600;
`;

const StatisticsRow = styled(Row)`
  padding-top: 1.5em;
  padding-bottom: 1.5em;
`;

type Props = WithForm<ReportRow> & intlShape;

class ReportPage extends Component<Props> {
  componentDidMount() {
    const { getReport } = this.props;
    getReport();
  }

  render() {
    const { handleReset, handleSubmit, reportRows, ...rest }: Props = this.props;

    return (
      <Layout>
        <ControlContainer fluid>
          <TitleRow>
            <Col sm={{ size: 11, offset: 1 }}>
              <FormattedMessage tagName="h2" id="site.report.title" />
            </Col>
          </TitleRow>
          <Row>
            <Col sm={{ size: 2, offset: 1 }}>
              <IntlComponent Component={ReportTitle} id="site.report.yearly_report" />
            </Col>
            <Col sm={{ size: 4 }}>
              <ReportForm {...rest} />
            </Col>
            <Col sm={{ size: 2 }}>
              <IntlComponent
                Component={Button}
                block
                type="submit"
                onClick={handleSubmit}
                color="success"
                id="site.report.yearly_report"
              />
            </Col>
          </Row>
          <StatisticsRow>
            <IntlComponent
              Component={Col}
              sm={{ size: 2, offset: 1 }}
              id="site.report.total_events"
              values={{ event_amount: reportRows.events }}
            />
            <IntlComponent
              Component={Col}
              sm={{ size: 2, offset: 1 }}
              id="site.report.total_participants"
              values={{ participant_amount: reportRows.participants }}
            />
          </StatisticsRow>
        </ControlContainer>
        <FormContainer>
          <Row>
            <Col>
              <Table>
                <thead>
                  <TrRow>
                    <IntlComponent Component="th" id="site.report.table.header.area" />
                    <IntlComponent Component="th" id="site.report.table.header.contact_person" />
                    <IntlComponent Component="th" id="site.report.table.header.email" />
                    <IntlComponent Component="th" id="site.report.table.header.phone" />
                    <IntlComponent Component="th" id="site.report.table.header.events" />
                    <IntlComponent Component="th" id="site.report.table.header.participants" />
                  </TrRow>
                </thead>
                <tbody>
                  {reportRows &&
                    reportRows.valueSeq().map(reportRow => (
                      <TrRow key={reportRow.id}>
                        <Td>{reportRow.area}</Td>
                        <Td>{reportRow.contact_person}</Td>
                        <Td>{reportRow.email}</Td>
                        <Td>{reportRow.phone}</Td>
                        <Td>{reportRow.events}</Td>
                        <Td>{reportRow.participants}</Td>
                      </TrRow>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </FormContainer>
      </Layout>
    );
  }
}

export default ReportPage;
