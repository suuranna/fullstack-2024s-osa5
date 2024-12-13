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

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Maijalainen')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Logged in succesfully! Welcome to blogapp, Maija Meikäläinen')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Maijalainen')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('#password').clear()
      cy.get('#username').type('2')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })
})