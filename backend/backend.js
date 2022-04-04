const bodyParser = require('body-parser')
const njk = require('nunjucks')
const fs = require('fs/promises')
const { randomUUID } = require('crypto')
const express = require('express')

const server = express()

njk.configure(
  'views',
  {
    express: server
  }
)
  
server.use('/content', express.static('content'))
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
  fs.readdir('./views/posts') 
    .then(
      posts => res.render("blogs.njk", { posts: posts.reverse() })
   )
})

server.get('/about', (req, res) => res.render('about.njk'))
server.get('/settings', (req, res) => res.render('settings.njk'))

server.post('/posts', (req, res) => {
    const postText = req.body['post-text'].replace(/\n/, "<br>")
    const titleText = req.body['title']
    const now = new Date(Date.now())
    const nowText = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`
    const filePath = "./views/posts/"  + now.toLocaleString().replace(/[ ,\/:]/g, '-') + "_" + randomUUID() +  ".txt" 
    fs.writeFile(filePath, `<h1>${titleText}</h1><p>${postText}</p><p class="date">${nowText}</p>`)
    .then(() => res.redirect('/'))
  })
  
  server.listen(12345, () => console.log("Server started!"))
