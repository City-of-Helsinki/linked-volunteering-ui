describe('Yearly reports', () => {
  it('Initially there are no reports', () => {
    cy.visit('/fi/admin/report');
    cy.contains('Talkoita yhteensä 0');
    cy.contains('Osallistujia yhteensä 0');
  });

  it('Loads reports from selected years', () => {
    cy.visit('/fi/admin/report');
    cy.get('#area').select('2021');
    cy.contains('Talkoita yhteensä 10');
    cy.contains('Osallistujia yhteensä 26');
    cy.get('#area').select('2020');
    cy.contains('Talkoita yhteensä 43');
    cy.contains('Osallistujia yhteensä 123');
  });
});
