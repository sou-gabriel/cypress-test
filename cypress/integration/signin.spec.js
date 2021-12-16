/// <reference types="Cypress" />

describe('Login do usuário', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Não deve realizar login de um usuário não autorizado', () => {
    cy.signin({
      email: 'gabriel@luby.com.br',
      password: 'secret'
    }, 401)
  })

  it('Deve realizar login de um usuário autorizado', () => {
    cy.signin({
      email: 'manoel@luby.com.br',
      password: 'secret'
    }, 200)
  })
})
