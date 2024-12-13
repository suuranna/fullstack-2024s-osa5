describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Maija Meikäläinen',
      username: 'Maijalainen',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('log in to application')
  })
})