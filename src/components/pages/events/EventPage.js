import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'reactstrap';
import { StickyContainer, Sticky } from 'react-sticky';
import responsive from '../../../utils/responsive';

import Layout from '../../layout/containers/LayoutContainer';
import EventForm from '../../form/EventForm';

const FormContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
  padding-top: 2em;
  padding-bottom: 2em;
`;

const TitleContainer = styled(Container)`
  h2 {
    font-size: ${props => props.theme.h4FontSize};
  }

  ${responsive.md`
    h2 {
      font-size: ${props => props.theme.h2FontSize};
    }
  `}
`;
const StickyInner = styled.div`
  padding: 1em;
  background-color: ${props => props.theme.helWhite};
  border-bottom: 1em solid ${props => props.theme.colors.lightGray};
  z-index: 5000;
`;

class NewEventPage extends PureComponent {
  componentDidMount() {
    const { neighborhoods, getNeighborhoods } = this.props;
    if (neighborhoods.size === 0) {
      getNeighborhoods();
    }
  }

  render() {
    const {
      handleReset,
      handleSubmit,
      intl: { formatMessage },
      pageType,
      ...rest
    } = this.props;

    return (
      <Layout paddingBottom>
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              <StickyInner style={style}>
                <TitleContainer fluid>
                  <Row>
                    <Col lg="12" xl={{ size: 6, offset: 1 }}>
                      <h2>{formatMessage({ id: `form.event.${pageType}.heading` })}</h2>
                    </Col>
                    <Col lg="6" xl={{ size: 2 }}>
                      <Button block type="button" onClick={handleReset} color="danger">
                        {formatMessage({ id: `form.event.${pageType}.button.reset` })}
                      </Button>
                    </Col>
                    <Col lg="6" xl={{ size: 2 }}>
                      <Button block type="submit" onClick={handleSubmit} color="success">
                        {formatMessage({ id: `form.event.${pageType}.button.submit` })}
                      </Button>
                    </Col>
                  </Row>
                </TitleContainer>
              </StickyInner>
            )}
          </Sticky>
          <FormContainer>
            <EventForm {...rest} />
          </FormContainer>
        </StickyContainer>
      </Layout>
    );
  }
}

export default NewEventPage;
