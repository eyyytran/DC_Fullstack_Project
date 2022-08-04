const { appUrl } = require('../../globals')

const loginBtn = document.getElementById('h-loginbtn')
const dashboardBtn = document.getElementById('h-dashboardbtn')
const signupBtn = document.getElementById('h-signupbtn')

loginBtn.onclick = () => (window.location.href = appUrl + '/login')
dashboardBtn.onclick = () => (window.location.href = appUrl + '/dashboard')
signupBtn.onclick = () => (window.location.href = appUrl + '/signup')
