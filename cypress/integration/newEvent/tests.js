import newEvent from '../../fixtures/newEvent';

describe('New event', () => {
  it('don\t submit invalid form', () => {
    cy.visit('http://localhost:3000/fi/event/new');
    cy.get('button[type="submit"]').click();
    cy.get('input.is-invalid');
    cy.contains('Ilmoita uusi vapaaehtoistapahtuma');
  });
  it('Fill & submit', () => {
    cy.visit('http://localhost:3000/fi/event/new');

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
