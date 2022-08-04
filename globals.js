const appUrl = process.env.HEROKU_APP_NAME
    ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    : 'http://localhost:3001'

module.exports = {
    appUrl,
}
