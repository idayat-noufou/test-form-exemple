describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
  })

  it('get env variabes', () => {
    cy.log(import.meta.env);
  })
})