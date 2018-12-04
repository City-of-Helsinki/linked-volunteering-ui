import newEvent from '../../fixtures/newEvent';

describe('Company', () => {
  it('creates an appliation with unregistered boat', () => {
    cy.visit('http://localhost:3000/fi/new-event');

    Object.entries(newEvent).forEach(([key, { method, value }]) => {
      if (method === 'click') {
        cy.get(`[for=${key}]`).click();
      } else {
        cy.get(`#${key}`)[method](value);
      }
    });
    cy.get('div.leaflet-touch').click();
    cy.get('button[type="submit"]').click();

    cy.contains('Tapahtuma lisätty onnistuneesti');
  });
});
