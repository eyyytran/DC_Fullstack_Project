const getTitle = route => {
    const routeToTitleMap = {
        index: 'Home | Trelljoe',
        signup: 'Sign Up | Trelljoe',
        login: 'Log In | Trelljoe',
        dashboard: 'Dashboard | Trelljoe',
        project: 'Project | Trelljoe',
    }
    return routeToTitleMap[route]
}

const getScript = route =>
    `<script defer src="/public/js/${route}.js"></script>`

module.exports = {
    getTitle,
    getScript,
}
