/// <reference types="Cypress" />

describe('Autenticação de um usuário', () => {
  it('Deve realizar o login com um usuário já cadastrado', () => {
    cy.visit('http://localhost:3000/')

    cy.get(':nth-child(1) > .sc-hKwDye').type('manoel@luby.com.br')
    cy.get(':nth-child(2) > .sc-hKwDye').type('secret')

    cy.server()
    cy.route('POST', 'http://127.0.0.1:3333/login').as('userLogin')

    cy.get('.sc-jRQBWg').click()

    cy.wait('@userLogin').then(xhr => {
      expect(xhr.status).to.be.eq(200)
    })
  })

  it('Deve realizar o login com um usuário não cadastrado', () => {
    cy.visit('http://localhost:3000/')

    cy.get(':nth-child(1) > .sc-hKwDye').type('john@doe.com.br')
    cy.get(':nth-child(2) > .sc-hKwDye').type('secret')

    cy.server()
    cy.route('POST', 'http://127.0.0.1:3333/login').as('userLogin')

    cy.get('.sc-jRQBWg').click()

    cy.wait('@userLogin').then(xhr => {
      expect(xhr.status).to.be.eq(401)
    })
  })
})