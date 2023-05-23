/// <reference types="cypress" />

const { should } = require("chai")

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Exercício: preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,'
        cy.clock()
        //cy.get('#firstName').type('Lafaiete')
        cy.get('input[id="firstName"]').type('Lafaiete')
        //cy.get('#lastName').type('Lafaiete')
        cy.get('input[id="lastName"]').type('Machado')
        //cy.get('#email').type('Lafaiete')
        cy.get('input[id="email"]').type('lafaiete.machado@gmail.com')
        //cy.get('#open-text-area').type('Lafaiete')
        cy.get('[id="open-text-area"]').type(longText, { delay: 0 })
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')

    })

    it('Exercício de fixação - buscar elementos visíveis na tela', () => {
        cy.get(':nth-child(1) > label > strong').should('be.visible', 'Nome')
        cy.get(':nth-child(2) > label > strong').should('be.visible', 'Sobrenome')
        cy.get(':nth-child(2) > :nth-child(1) > label > strong').should('be.visible', 'E-mail')
        cy.get(':nth-child(2) > :nth-child(1) > label > strong').should('be.visible', 'Telefone')
        cy.get('input[value="ajuda"]').should('be.visible', 'Ajuda')
        cy.get('input[value="elogio"]').should('be.visible', 'Elogio')
        cy.get('input[value="feedback"]').should('be.visible', 'Feedback')
    })

    it('Exercício extra 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Lafaiete')
        cy.get('#lastName').type('Machado')
        cy.get('#email').type('lafaiete.machado.com')
        cy.get('[id="open-text-area"]').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Exercício extra 3 - campo telefone continua vazio quando preenchido com valor não numerico', () => {
        cy.get('#phone').type('abcdefg').should('have.value', '')
    })

    it('Exercício extra 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Lafaiete')
        cy.get('#lastName').type('Machado')
        cy.get('#email').type('lafaiete.machado@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('[id="open-text-area"]').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Exercício extra 5 - preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Lafaiete').should('have.value', 'Lafaiete').clear().should('have.value', '')
        cy.get('#lastName').type('Machado').should('have.value', 'Machado').clear().should('have.value', '')
        cy.get('#email').type('lafaiete.machado@gmail.com').should('have.value', 'lafaiete.machado@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('9999999999').should('have.value', '9999999999').clear().should('have.value', '')
    })

    it('Exercício extra 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Exercício extra 7 - envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3).each(function ($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Lafaiete')
        cy.get('#lastName').type('Machado')
        cy.get('#email').type('lafaiete.machado@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('[id="open-text-area"]').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target',).click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.equal('CAC TAT')
        })
    })

    it('encontra o gato escondido', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtite')
            .invoke('text', 'Eu amo gatos' )
    })
})