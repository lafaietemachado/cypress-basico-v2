Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Lafaiete')
    cy.get('#lastName').type('Machado')
    cy.get('#email').type('lafaiete.machado@gmail.com')
    cy.get('#phone').type('9999999999')
    cy.get('#phone-checkbox').click()
    cy.get('[id="open-text-area"]').type('Teste')
    cy.contains('button', 'Enviar').click()
})