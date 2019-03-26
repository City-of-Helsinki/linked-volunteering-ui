import moment from 'moment';
import newEvent from '../fixtures/newEvent';

describe('New event', () => {
  it("Don't submit invalid form", () => {
    cy.visit('/fi/event/new');
    cy.get('button[type="submit"]').click();
    cy.get('input.is-invalid');
    cy.contains('Ilmoita uusi puistotalkoo');
  });
  it('Fill & submit', () => {
    cy.visit('/fi/event/new');

    cy.get('div.leaflet-touch').click();

    Object.entries(newEvent).forEach(([key, { method, value }]) => {
      if (method === 'click') {
        cy.get(`[for=${key}]`).click();
      } else if (method === 'autosuggest') {
        cy.get(`#${key}`).type(value);
        cy.get('.react-autosuggest__suggestion--first').click();
      } else {
        cy.get(`#${key}`)[method](value);
      }
    });

    const dayOfMonth = moment().format('DD');

    cy.get('#date_range_start_date').click();
    cy.get(`#date_range_start_date_wrapper .react-datepicker__day--0${dayOfMonth}`).click();

    cy.get('#date_range_end_date').click();
    cy.get(`#date_range_end_date_wrapper .react-datepicker__day--0${dayOfMonth}`).click();

    cy.get('button[type="submit"]').click();

    cy.contains('Kiitos ilmoituksesta');
  });
});
