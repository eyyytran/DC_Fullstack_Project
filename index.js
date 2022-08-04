const express = require('express')
const app = express()
const cors = require('cors')
const es6Renderer = require('express-es6-template-engine')
const checkLogin = require('./util/checkLogin')
const { getTitle, getScript } = require('./util/locals')
const cookieParser = require('cookie-parser')
const models = require('./db/models')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// routes
const usersRoutes = require('./routes/users')
const projectsRoutes = require('./routes/projects')
const cardsRoutes = require('./routes/cards')

const store = new SequelizeStore({
    db: models.sequelize,
})

const PORT = process.env.PORT || 3001

app.use(
    cors({ origin: 'http://127.0.0.1:5500', methods: 'GET,POST,PUT,DELETE' })
)
app.use(express.json())
app.use('/public', express.static('./public'))
app.engine('html', es6Renderer)
app.set('views', './views')
app.set('view engine', 'html')
app.use(cookieParser())
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: store,
    })
)
store.sync()

// define routes
app.use('/users', usersRoutes)
app.use('/projects', checkLogin, projectsRoutes)
app.use('/cards', checkLogin, cardsRoutes)

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

app.get('/index', (req, res) => {
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

app.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: getTitle('login'),
            script: getScript('login'),
        },
        partials: {
            partial: 'login',
        },
    })
})

app.get('/dashboard', checkLogin, (req, res) => {
    res.render('template', {
        locals: {
            title: getTitle('dashboard'),
            script: getScript('dashboard'),
        },
        partials: {
            partial: 'dashboard',
        },
    })
})

app.get('/project', checkLogin, (req, res) => {
    res.render('template', {
        locals: {
            title: getTitle('project'),
            script: getScript('project'),
        },
        partials: {
            partial: 'project',
        },
    })
})

app.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: getTitle('signup'),
            script: getScript('signup'),
        },
        partials: {
            partial: 'signup',
        },
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
