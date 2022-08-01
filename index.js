const express = require('express')
const cors = require('cors')
const { getTitle, getScript } = require('./util/locals')

const app = express()
app.use(
    cors({ origin: 'http://127.0.0.1:5500', methods: 'GET,POST,PUT,DELETE' })
)

const usersRoutes = require('./routes/users')
const projectsRoutes = require('./routes/projects')
const cardsRoutes = require('./routes/cards')
const userProjectRoutes = require('./routes/user_projects')
const es6Renderer = require('express-es6-template-engine')
const PORT = 3001

//middleware
app.use(express.json())
app.use('/users', usersRoutes)
app.use('/projects', projectsRoutes)
app.use('/cards', cardsRoutes)
app.use('/user_projects', userProjectRoutes)

app.use('/public', express.static('./public'))
app.engine('html', es6Renderer)
app.set('views', './views')
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('template', {
        locals: {
            title: getTitle('index'),
            script: getScript('index'),
        },
        partials: {
            partial: 'index',
        },
    })
})

app.get('/:route', (req, res) => {
    const route = req.params.route
    res.render('template', {
        locals: {
            title: getTitle(route),
            script: getScript(route),
            allProjects: [],
        },
        partials: {
            partial: route,
        },
    })
})

//listening port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
