describe('Manage events', () => {
  it('Accept will activate success info text', () => {
    cy.visit('/fi/events/manage');
    cy.get('#manage_event_table tbody tr:first-child [id^="extend_event_"]').click();
    cy.wait(500);
    cy.get('#manage_event_table [id^="approve_event_"]').click();
    cy.contains('hyväksytty!');
  });

  it('Remove will be bring up modal and will activate removed info text', () => {
    cy.visit('/fi/events/manage');
    cy.get('#manage_event_table tbody tr:first-child [id^="extend_event_"]').click();
    cy.get('#manage_event_table tbody [id^="reject_event_"]').click();
    cy.contains('Poistetaanko tapahtuma?');
    cy.get('.modal-footer > .btn-primary').click();
    cy.contains('peruttu!');
  });

  it('Modify will take to event modification page', () => {
    cy.visit('/fi/events/manage');
    cy.get('#manage_event_table tbody tr:first-child [id^="edit_event_"]').click();
    cy.contains('Muokkaa tapahtumaa');
    cy.get('.btn-success').click();
    cy.contains('Tapahtumaa muokattu onnistuneesti!');
  });
});
