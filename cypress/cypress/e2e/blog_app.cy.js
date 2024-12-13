describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    let user = {
      name: 'Maija Meikäläinen',
      username: 'Maijalainen',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    user = {
      name: 'Matti Meikäläinen',
      username: 'Mattimaa',
      password: 'sanasala'
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

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        username: 'Maijalainen',
        password: 'salasana'
      }
      cy.request('POST', 'http://localhost:3003/api/login/', user).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function() {
      cy.contains('blogs')
      cy.contains('new note').click()
      cy.get('#title').type('Otsikko')
      cy.get('#author').type('Kirjoittaja')
      cy.get('#url').type('www.url.fi')
      cy.get('#add-button').click()
      cy.contains('Otsikko by Kirjoittaja added')
      cy.wait(6000)
      cy.contains('Otsikko by Kirjoittaja')
    })

    describe('when one blog is added', function() {
      beforeEach(function() {
        const info = JSON.parse(localStorage.getItem('loggedBlogAppUser'))
        const id = info.user_id
        const token = info.token

        const blog = {
          title: "Hyvä otsikko",
          author: "Huono kirjoittaja",
          url: "www.tamaonurl.com",
          user: {username: 'Maijalainen', name: 'Maija Meikäläinen', id: id}
        }
        cy.request({
          url: 'http://localhost:3003/api/blogs/',
          method: 'POST',
          body: blog,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        cy.visit('http://localhost:5173')
      })
      
      it('a blog can be liked', function() {
        cy.contains('Hyvä otsikko by Huono kirjoittaja')
        cy.contains('view').click()
        cy.contains('likes: 0')
        cy.contains('like').click()
        cy.contains('like').click()
        cy.contains('likes: 2')
      })

      describe('when two users have added blogs', function() {
        beforeEach(function() {
          localStorage.clear()
          cy.visit('http://localhost:5173')
          
          cy.request('POST', 'http://localhost:3003/api/login/', { username: 'Mattimaa', password: 'sanasala' }).then(response => {
            localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
            cy.visit('http://localhost:5173')
            const info = JSON.parse(localStorage.getItem('loggedBlogAppUser'))
            const id = info.user_id
            const token = info.token
    
            const blog = {
              title: "Huono otsikko",
              author: "Okei kirjoittaja",
              url: "www.tamaeioleurl.com",
              user: {username: 'Mattimaa', name: 'Matti Meikäläinen', id: id}
            }
            cy.request({
              url: 'http://localhost:3003/api/blogs/',
              method: 'POST',
              body: blog,
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            localStorage.clear()
            cy.visit('http://localhost:5173')
            const user = {
              username: 'Maijalainen',
              password: 'salasana'
            }
            cy.request('POST', 'http://localhost:3003/api/login/', user).then(response => {
              localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
              cy.visit('http://localhost:5173')
            })
          })
        })

        it('a blog can be removed by the person who added it and remove-button is only visible to them', function() {
          cy.visit('http://localhost:5173')
          cy.wait(1000)
          cy.contains('Hyvä otsikko by Huono kirjoittaja').contains('view').click()
          cy.get('button').contains('remove').click()
          cy.contains('Hyvä otsikko by Huono kirjoittaja removed!')
          cy.contains('Huono otsikko by Okei kirjoittaja').contains('view').click()
          cy.get('button').get('remove').should('not.exist')
        })
      })
    })
  })
})