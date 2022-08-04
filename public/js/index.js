const loginBtn = document.getElementById('h-loginbtn')
const dashboardBtn = document.getElementById('h-dashboardbtn')
const signupBtn = document.getElementById('h-signupbtn')
const guestBtn = document.getElementById('h-guestbtn')

const loginGuest = async () => {
    const result = await fetch(`${window.location.origin}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'guest',
            email: `${Math.floor(100000 + Math.random() * 900000)}@destroy.com`,
            password: 'Abc1234!',
        }),
    })
    const user = await result.json()
    localStorage.setItem('user', JSON.stringify(user))
    setTimeout(() => {
        window.location.href = window.location.origin + '/dashboard'
    }, 100)
}

loginBtn.onclick = () =>
    (window.location.href = window.location.origin + '/login')
dashboardBtn.onclick = () =>
    (window.location.href = window.location.origin + '/dashboard')
signupBtn.onclick = () =>
    (window.location.href = window.location.origin + '/signup')
// guestBtn.onclick = async () => loginGuest()
guestBtn.onclick = async () => {
    loginGuest()
}
