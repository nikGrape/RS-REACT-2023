describe('App E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have an input field', () => {
    cy.get('input').should('have.value', '').should('be.visible');
  });

  it('shoul search for value and get expected result', () => {
    const value = 'rick dead humanoid';
    cy.get('input').type(value).should('have.value', value).type('{enter}');

    cy.get('h4').first().should('have.text', 'Cyclops Rick');
  });

  it('shoul open a hint window by clickin ? button and close it on X', () => {
    cy.get('button').contains('?').click();
    const hint = cy.get('p').contains('Supported search (space separated):');

    hint.should('be.visible');

    cy.get('button').contains(/X/).click();

    hint.should('not.exist');
  });

  it('shoud add likes and views and open/close modal window for a card', () => {
    const card = cy.get('.card').first();

    const like = card.get('.card-likes').first();
    like.should('have.text', '0');
    like.click().click().click().click();
    like.should('have.text', '4');
  });

  it('should open a modal window for card and close it and show +1 view', () => {
    const card = cy.get('.card').first();

    const view = card.get('.card-views').first();
    view.should('have.text', '0');

    card.click();
    cy.get('button').contains(/X/gi).click();

    card.get('.card-views').first().should('have.text', '1');
  });

  it('should save input value when change pages', () => {
    const value = 'rick human alive';
    cy.get('input').type(value).type('{enter}');

    cy.get('a').contains(/about/i).click();

    cy.contains(/this is what it is all about/i).should('be.visible');

    cy.get('a').contains(/home/i).click();

    cy.get('input').should('have.value', value);
  });
});
