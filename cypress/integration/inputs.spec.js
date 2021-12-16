describe('Validar entradas do usuário', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it('Deve exibir uma mensagem de erro quando o nome do usuário estiver vazio', () => {
    cy.get(':nth-child(1) > .sc-hKwDye').click()
    cy.contains('O nome do usuário não pode estar vazio').should('be.visible')
  })

  it('Deve exibir mensagem de erro quando o nome do usuário não atender a quantidade mínima de caracteres', () => {
    cy.get(':nth-child(1) > .sc-hKwDye').type('Ga')
    cy.contains('O nome precisa de pelo menos 3 caracteres').should('be.visible')
  })

  it('Deve exibir uma mensagem de erro quando o email do usuário estiver vazio', () => {
    cy.get(':nth-child(2) > .sc-hKwDye').click()
    cy.contains('O e-mail não pode ficar vazio').should('be.visible')
  })

  it('Deve exibir uma mensagem de erro quando a senha do usuário estiver vazia', () => {
    cy.get(':nth-child(3) > .sc-hKwDye').click()
    cy.contains('Você precisa informar uma senha').should('be.visible')
  })

  it('Deve exibir uma mensagem de erro quando a senha do usuário não atender a quantidade mínima de caracteres', () => {
    cy.get(':nth-child(3) > .sc-hKwDye').type(12)
    cy.contains('Sua senha deve possuir mais de 3 caracteres').should('be.visible')
  })
})