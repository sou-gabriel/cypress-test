/// <reference types="Cypress" />

describe('Registro de um novo usuário', () => {
  it('Deve realizar um cadastro de um usuário já cadastrado', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get(':nth-child(1) > .sc-hKwDye').type('Manoel')
    cy.get(':nth-child(2) > .sc-hKwDye').type('manoel@luby.com.br')
    cy.get(':nth-child(3) > .sc-hKwDye').type('secret')

    cy.server()
    cy.route('POST', 'http://127.0.0.1:3333/user/create').as('postUser')

    cy.get('.sc-jRQBWg').click()

    cy.wait('@postUser').then(xhr => {
      expect(xhr.status).to.be.eq(400)
      expect(xhr.response.body.error.message).to.be.eq('Email already exists')
    })
  })

  it('Deve realizar um cadastro um usuário ainda não cadastrado', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get(':nth-child(1) > .sc-hKwDye').type('Gabriel')
    cy.get(':nth-child(2) > .sc-hKwDye').type('dev.gabrielramos@gmail.com')
    cy.get(':nth-child(3) > .sc-hKwDye').type('new_secret')

    cy.server()
    cy.route('POST', 'http://127.0.0.1:3333/user/create').as('postUser')

    cy.get('.sc-jRQBWg').click()

    cy.wait('@postUser').then(xhr => {
      cy.log(xhr)
      expect(xhr.status).to.be.eq(200)
      expect(xhr.response.body.token.token).is.not.null
    })
  })
})
