describe('Manage events', () => {
  it('Accept will activate success info text', () => {
    cy.visit('http://localhost:3000/fi/events/manage');
    cy.get(':nth-child(1) > :nth-child(8) > .btn').click();
    cy.get('.btn-primary').click();
    cy.contains('hyväksytty!');
  });

  it('Remove will be bring up modal and will activate removed info text', () => {
    cy.visit('http://localhost:3000/fi/events/manage');
    cy.get(':nth-child(1) > :nth-child(8) > .btn').click();
    cy.get('.remove-button').click();
    cy.contains('Poistetaanko tapahtuma?');
    cy.get('.modal-footer > .btn-primary').click();
    cy.contains('peruttu!');
  });

  it('Modify will take to event modification page', () => {
    cy.visit('http://localhost:3000/fi/events/manage');
    cy.get(':nth-child(1) > :nth-child(7) > a > span').click();
    cy.contains('Muokkaa tapahtumaa');
    cy.get('.btn-success').click();
    cy.contains('Tapahtumaa muokattu onnistuneesti!');
  });
});
