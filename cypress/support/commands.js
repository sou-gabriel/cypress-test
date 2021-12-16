// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('token', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('endpoint')}/login`,
    body: {
      email: 'manoel@luby.com.br',
      password: 'secret'
    }
  })
})

Cypress.Commands.add('login', () => {
  cy.token().then(response => {
    const { token } = response.body.token 
    localStorage.setItem('token', token)
  })
})

Cypress.Commands.add('signup', (values, expectedStatus) => {
  cy.get(':nth-child(1) > .sc-hKwDye').type(values.username)
  cy.get(':nth-child(2) > .sc-hKwDye').type(values.email)
  cy.get(':nth-child(3) > .sc-hKwDye').type(values.password)

  cy.intercept({
    method: 'POST',
    url: `${Cypress.env('endpoint')}/user/create`,
  }).as('registerUser')
  
  cy.get('.sc-jRQBWg').click()
  
  cy.wait('@registerUser').then(request => {
    cy.log(request)
    expect(request.response.statusCode).to.be.eq(expectedStatus)
  })
})

Cypress.Commands.add('signin', (values, expectedStatus) => {
  cy.get(':nth-child(1) > .sc-hKwDye').type(values.email)
  cy.get(':nth-child(2) > .sc-hKwDye').type(values.password)

  cy.intercept({
    method: 'POST',
    url: `${Cypress.env('endpoint')}/login`,
  }).as('login')

  cy.get('.sc-jRQBWg').click()

  cy.wait('@login').then(request => {
    cy.log(request)
    expect(request.response.statusCode).to.be.eq(expectedStatus)
  })
})


