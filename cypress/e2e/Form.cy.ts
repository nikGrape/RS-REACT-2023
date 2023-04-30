describe('Users (Form)', () => {
  beforeEach(() => {
    cy.visit('/users');
  });

  const fillForm = () => {
    cy.get('[placeholder="First Name"]').type('Rick');
    cy.get('[placeholder="Last Name"]').type('Morty');
    cy.get('[placeholder="Brain Weight (grams)"]').type('1100');
    cy.get('[placeholder="ZIP"]').type('666777');
    cy.get('[type="date"]').type('2000-10-10');
    cy.get('[type="radio"]').first().click();
    cy.get('[placeholder="type in your bio"]').type('I am a crazy scientist hahahahahah');
    cy.get('input[type="checkbox"').click({ multiple: true });
    cy.get('select').select('Blue');
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('file contents'),
      fileName: 'avatar.gif',
      lastModified: Date.now(),
    });
  };

  it('should do name validation', () => {
    const submit = cy.get('button[type="submit"]');

    submit.click();

    cy.contains(/first name is required/i).should('be.visible');

    cy.get('[placeholder="First Name"]').type('Rick');

    submit.click();

    cy.contains(/first name is required/i).should('not.exist');
  });

  it('should add a card on valid input and show seccess message', () => {
    fillForm();

    cy.get('button[type="submit"]').click();

    cy.contains(/the user was successfully added/i).should('be.visible');
    cy.contains(/agreed to: share data, policy/i).should('be.visible');
  });

  it('should save a card after page change', () => {
    fillForm();

    cy.get('button[type="submit"]').click();

    cy.get('a').contains(/home/i).click();
    cy.get('a').contains(/users/i).click();

    cy.contains(/agreed to: share data, policy/i).should('be.visible');
  });
});
