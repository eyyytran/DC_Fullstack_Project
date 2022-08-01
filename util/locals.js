const getTitle = route => {
    const routeToTitleMap = {
        index: 'Home | Trelljoe',
        signup: 'Sign Up',
        login: 'Log In',
        dashboard: 'Dashboard',
        project: 'Project',
    }
    return routeToTitleMap[route]
}

const getScript = route =>
    `<script defer src="/public/js/${route}.js"></script>`

module.exports = {
    getTitle,
    getScript,
}
