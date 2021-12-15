/// <reference types="Cypress" />

describe('Validação dos campos de cadastro de usuário', () => {
  // Validação do campo de nome de usuário
  it('Deve ser um campo de email inválido', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get(':nth-child(1) > .sc-hKwDye').click()
    cy.contains('O nome do usuário não pode estar vazio')

    cy.get(':nth-child(1) > .sc-hKwDye').type('Ma')
    cy.contains('O nome precisa de pelo menos 3 caracteres')
  })

  it('Deve ser um campo de email válido', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get(':nth-child(1) > .sc-hKwDye').type('manoel@luby.com.br')
    cy.get('form > div:nth-child(1) > span').should('not.exist')
  })

  // Validação do campo de email 
  it('Deve ser um campo de nome de usuário vazio', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get(':nth-child(2) > .sc-hKwDye').click()
    cy.contains('O e-mail não pode ficar vazio')
  })

  it('Deve ser um campos de nome de usuário válido', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get(':nth-child(2) > .sc-hKwDye').type('Manoel')
    cy.get('form > div:nth-child(2) > span').should('not.exist')
  })

  // Validação do campo de senha
  it('Deve ser um campo de senha inválido', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get(':nth-child(3) > .sc-hKwDye').click()
    cy.contains('Você precisa informar uma senha')

    cy.get(':nth-child(3) > .sc-hKwDye').type('se')
  })

  it('Deve ser um vazio de senha com um valor válido', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get(':nth-child(3) > .sc-hKwDye').type('secret')
    cy.get('form > div:nth-child(3) > span').should('not.exist')
  })
})

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
      expect(xhr.status).to.be.eq(200)
    })
  })
})
