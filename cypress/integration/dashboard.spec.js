/// <reference types="Cypress" />

describe('Criar uma aposta da Mega-Sena', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/dashboard')
    cy.get('.kvzVQS').click()
  })

  it('Exibir o jogo da Mega-Sena deveria funcionar', () => {
    cy.get('.sc-faUpoM').should('include.text', 'Mega-Sena')
  })

  it('Selecionar número de jogo da Mega-Sena deveria funcionar', () => {
    cy.get('.sc-lbhJGD > [value="1"]').click()
    cy.get('.go2072408551').should('include.text', 'Número selecionado com sucesso!')
  })

  it('Remover número selecionado da Mega-Sena deveria funcionar', () => {
    cy.get('.sc-lbhJGD > [value="1"]').click()
    cy.get('.sc-lbhJGD > [value="1"]').click()
    cy.get('.go2072408551').should('include.text', 'Número desmarcado da aposta!')
  })

  it('Selecionar uma quantidade inválida de números da Mega-Sena não deveria funcionar', () => {
    for (let gameNumber = 1; gameNumber <= 6; gameNumber++) {
      cy.get(`.sc-lbhJGD > [value="${gameNumber}"]`).click()
    }

    cy.get('.sc-lbhJGD > [value="7"]').click()
    cy.get('.go2072408551').should('include.text', 'Não é possível escolher novos números!')
  })

  it('Completar números da Mega-Sena aleatoriamente deveria funcionar', () => {
    cy.get(':nth-child(7) > .sc-cNKqjZ > :nth-child(1)').click()
    cy.get('.go2072408551').should('include.text', 'Cartela preenchida com sucesso!')
  })

  it('Adicionar jogo da Mega-Sena no carrinho deveria funcionar', () => {
    cy.get(':nth-child(7) > .sc-cNKqjZ > :nth-child(1)').click()
    cy.get('.grualo').click()
    cy.get('.go2072408551').should('include.text', 'Jogo adicionado com sucesso ao carrinho!')
  })

  it('Adicionar jogo repetido da Mega-Sena no carrinho não deveria funcionar', () => {
    for (let gameNumber = 1; gameNumber <= 6; gameNumber++) {
      cy.get(`.sc-lbhJGD > [value="${gameNumber}"]`).click()
    }

    cy.get('.grualo').click()

    for (let gameNumber = 1; gameNumber <= 6; gameNumber++) {
      cy.get(`.sc-lbhJGD > [value="${gameNumber}"]`).click()
    }

    cy.get('.grualo').click()
    cy.get('.go2072408551').should('include.text', 'Já existe um semelhante no carrinho!')
  })

  it('Remover um jogo da Mega-Sena do carrinho deveria funcionar', () => {
    cy.get(':nth-child(7) > .sc-cNKqjZ > :nth-child(1)').click()
    cy.get('.grualo').click()
    cy.get('.sc-cidDSM').click()
    cy.get('.go2072408551').should('include.text', 'Aposta deletada com sucesso do carrinho!')
  })

  it('Salvar uma quantidade válida de jogos da Mega-Sena que estão no carrinho deve funcionar', () => {
    for (let i = 0; i < 15; i++) {
      cy.get(':nth-child(7) > .sc-cNKqjZ > :nth-child(1)').click()
      cy.get('.grualo').click()
    }

    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('endpoint')}/bet/new-bet`
    }).as('saveBet')

    cy.get('.sc-ksdxgE').click()

    cy.wait('@saveBet').then(request => {
      expect(request.response.statusCode).to.be.eq(200)
    })
  })

  it('Salvar uma quantia inválida de jogos da Mega-Sena que estão no carrinho não deve funcionar', () => {
    cy.get(':nth-child(7) > .sc-cNKqjZ > :nth-child(1)').click()
    cy.get('.grualo').click()
    cy.get('.sc-ksdxgE').click()
    cy.get('.go2072408551').should('be.visible')
  })
})
