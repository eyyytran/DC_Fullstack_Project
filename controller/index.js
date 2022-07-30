const express = require('express')
const cors = require('cors')
const app = express()
app.use(
    cors({ origin: 'http://127.0.0.1:5500', methods: 'GET,POST,PUT,DELETE' })
)

const usersRoutes = require('./routes/users')
const projectsRoutes = require('./routes/projects')
const cardsRoutes = require('./routes/cards')
const es6Renderer = require('express-es6-template-engine')
const PORT = 3001

//middleware
app.use(express.json())
app.use('/users', usersRoutes)
app.use('/projects', projectsRoutes)
app.use('/cards', cardsRoutes)

app.use(express.static('public'))
app.engine('html', es6Renderer)
app.set('views', './public/views')
app.set('view engine', 'html')
app.get('/test', (req, res) => {
    console.log('test successful')
    res.send('test successful')
})

//listening port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
