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

// Cypress.Commands.add('loginUser', () => {
//   cy.request({
//     url: 'http://127.0.0.1:3333/login',
//     method: 'POST',
//     body: {
//       email: 'manoel@luby.com.br',
//       password: 'secret'
//     }
//   }).then(response => {
//     expect(response.body.token.token).is.not.null
//     cy.log(response.body.token.token)

//     Cypress.env('userToken', response.body.token.token)
//   })
// })