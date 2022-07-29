//TODO: When we arrive on the home page, if the user is logged in, display the user name in the header, do not display log-in/sign-up button
const loginBtn = document.getElementById('login-button')
const dashboardBtn = document.getElementById('see-dashboard')
const signupBtn = document.getElementById('sign-up-button')

loginBtn.onclick = () =>
    (window.location.href =
        'http://127.0.0.1:5500/controller/public/views/login.html')
dashboardBtn.onclick = () =>
    (window.location.href =
        'http://127.0.0.1:5500/controller/public/views/project.html')
signupBtn.onclick = () =>
    (window.location.href =
        'http://127.0.0.1:5500/controller/public/views/registration.html')
