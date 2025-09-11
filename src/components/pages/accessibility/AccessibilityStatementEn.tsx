import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  hyphens: auto;
`;

const AccessibilityStatementEn: FunctionComponent = () => {
  return (
    <ContentWrapper lang="en">
      <h1>Accessibility Statement</h1>
      <p>
        This accessibility statement applies to the Park volunteer activities
        website (https://puistotalkoot.hel.fi/en) run by the City of Helsinki.
        This statement explains the website’s accessibility and how to submit
        feedback related to accessibility.
      </p>
      <h2>How accessible is this website?</h2>
      <p>
        The Act on the Provision of Digital Services states that public websites
        must be accessible, i.e. everyone should have an equal opportunity to
        use these websites.
      </p>
      <p>
        The website is for the most part compliant with all of the statutorily
        mandated accessibility requirements (WCAG criteria 2.1, A and AA
        standards). The website has some accessibility shortcomings which are
        described in more detail below.
      </p>
      <h2>Non-accessible content</h2>
      <p>
        The website is not fully accessible. The content or functions listed
        below are not fully compliant with the statutorily mandated
        accessibility requirements. We are continuously correcting any detected
        shortcomings in accessibility. This accessibility statement’s list of
        shortcomings is updated every time we rectify a shortcoming.
      </p>
      <h3>Header / footer</h3>
      <ul>
        <li>
          The link to the front page has not been named consistently in
          different parts of the site (WCAG 2.1: 2.4.4 Link Purpose (In
          Context), 2.5.3 Label in Name).
        </li>
        <li>
          The navigation elements have not been named individually for assistive
          technology users (WCAG 2.1: 1.3.1 Info and Relationships).
        </li>
        <li>
          The options’ roles in the language menu are not clear enough (WCAG
          2.1: 4.1.2 Name, Role, Value).
        </li>
        <li>
          The language menu’s visible focus does not have sufficient contrast
          (WCAG 2.1: 1.4.11 Non-text Contrast).
        </li>
      </ul>
      <h3>Front page</h3>
      <ul>
        <li>
          A link is identified incorrectly as a button (WCAG 2.1: 4.1.2 Name,
          Role, Value).
        </li>
      </ul>
      <h3>Form</h3>
      <ul>
        <li>
          Not all elements have a clear enough role or name for assistive
          technology users (WCAG 2.1: 4.1.2 Name, Role, Value).
        </li>
        <li>
          The page has content that does not have sufficient contrast (WCAG 2.1:
          1.4.3 Contrast (Minimum)).
        </li>
        <li>
          Not all changes in status are expressed automatically to assistive
          technology users, such as clearing a form (WCAG 2.1: 4.1.3 Status
          Messages).
        </li>
        <li>
          Error messages have not been tied to the input fields technically
          (WCAG 2.1: 1.3.1 Info and Relationships).
        </li>
        <li>
          The map area has not been outlined technically (WCAG 2.1: 1.3.1 Info
          and Relationships).
        </li>
        <li>
          Choosing a date from the calendar can be challenging for assistive
          technology users:
          <ul>
            <li>
              The calendar opens / closes automatically without user input (WCAG
              2.1: 3.2.2 On Input).
            </li>
            <li>
              Not all changes in status are expressed to assistive technology
              users (WCAG 2.1: 4.1.3 Status Messages).
            </li>
            <li>
              Not all interactive elements are usable via keyboard (WCAG 2.1:
              2.1.1 Keyboard).
            </li>
            <li>
              The arrow buttons’ accessible names differ from the language of
              the page (WCAG 2.1: 3.1.2 Language of Parts).
            </li>
            <li>
              The arrow buttons do not have sufficient contrast (WCAG 2.1:
              1.4.11 Non-text Contrast).
            </li>
          </ul>
        </li>
      </ul>
      <h2>Accessibility assessment</h2>
      <p>
        The accessibility assessment complies with the City of Helsinki’s
        operational guidelines and methods that aim to secure the service’s
        accessibility throughout every work stage.
      </p>
      <p>
        The accessibility of the website has been assessed by a third-party
        expert audit. The assessment included programmatic accessibility testing
        and a manual examination of the website and its content.
      </p>
      <h2>Did you notice shortcomings in accessibility?</h2>
      <p>
        We aim to continuously improve the accessibility of our website. If you
        encounter non-compliant content on the website that is not described on
        this page or if the material you need is not accessible, please report
        this to us.{' '}
        <a href="https://palautteet.hel.fi/en">
          Give feedback with the feedback form
        </a>
        .
      </p>
      <h2>Accessibility monitoring</h2>
      <p>
        The Finnish Transport and Communications Agency Traficom enforces
        compliance with accessibility requirements. If you are dissatisfied with
        the reply you received from us or you did not receive a reply within 14
        days, you may submit a notification to the Finnish Transport and
        Communications Agency Traficom. The website of the Finnish Transport and
        Communications Agency Traficom has information on submitting a
        notification and how notifications are processed.
      </p>
      <p>
        Finnish Transport and Communications Agency Traficom
        <br />
        Digital Accessibility Supervision Unit
        <br />
        www.webaccessibility.fi
        <br />
        saavutettavuus@traficom.fi <br />
        telephone switchboard +358 295 345 000
      </p>
      <a href="https://www.webaccessibility.fi">www.webaccessibility.fi</a>
      <h2>Accessibility statement information</h2>
      <p>This website was published after 23 September 2018.</p>
      <p>This statement was prepared on 18 May 2020.</p>
      <p>The statement was updated on 5 March 2025.</p>
      <a href="https://www.finlex.fi/fi/lainsaadanto/saadoskokoelma/2019/306">
        Act on the Provision of Digital Services (306/2019)
      </a>{' '}
      (in Finnish)
    </ContentWrapper>
  );
};

export default AccessibilityStatementEn;
