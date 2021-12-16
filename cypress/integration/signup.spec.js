/// <reference types="Cypress" />

describe('Registro de usuário', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it('Não deve cadastrar um usuário já cadastrado', () => {
    cy.signup({
      username: 'LubyTGL',
      email: 'luby@admin.com',
      password: 'secret'
    }, 400)
  })

  it('Deve cadastrar um novo usuário', () => {
    cy.signup({
      username: 'Gabriel',
      email: 'dev.gabrielramos@gmail.com',
      password: 123456
    }, 200)
  })
})
