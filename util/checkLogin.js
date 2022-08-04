const { getTitle, getScript } = require('./locals')

const checkLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.render('template', {
            locals: {
                title: getTitle('index'),
                script: getScript('index'),
            },
            partials: {
                partial: 'index',
            },
        })
    }
}

module.exports = checkLogin
