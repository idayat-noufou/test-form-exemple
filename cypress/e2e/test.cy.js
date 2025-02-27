describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
  })

  it('get env variabes', () => {
    console.log(import.meta.env);
  })
})