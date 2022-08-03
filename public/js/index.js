const loginBtn = document.getElementById('h-loginbtn')
const dashboardBtn = document.getElementById('h-dashboardbtn')
const signupBtn = document.getElementById('h-signupbtn')

loginBtn.onclick = () => (window.location.href = "http://localhost:3001/login");
dashboardBtn.onclick = () =>
  (window.location.href = "http://localhost:3001/dashboard");
signupBtn.onclick = () =>
  (window.location.href = "http://localhost:3001/signup");
