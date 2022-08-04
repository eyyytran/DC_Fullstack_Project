const loginBtn = document.getElementById('h-loginbtn')
const dashboardBtn = document.getElementById('h-dashboardbtn')
const signupBtn = document.getElementById('h-signupbtn')

loginBtn.onclick = () =>
    (window.location.href = window.location.origin + '/login')
dashboardBtn.onclick = () =>
    (window.location.href = window.location.origin + '/dashboard')
signupBtn.onclick = () =>
    (window.location.href = window.location.origin + '/signup')
