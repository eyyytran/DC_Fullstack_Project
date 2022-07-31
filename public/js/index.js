//TODO: When we arrive on the home page, if the user is logged in, display the user name in the header, do not display log-in/sign-up button
const loginBtn = document.getElementById('login-button')
const dashboardBtn = document.getElementById('see-dashboard')
const signupBtn = document.getElementById('sign-up-button')

loginBtn.onclick = () => (window.location.href = 'http://localhost:3001/login')
dashboardBtn.onclick = () =>
    (window.location.href = 'http://localhost:3001/dashboard')
signupBtn.onclick = () =>
    (window.location.href = 'http://localhost:3001/signup')
