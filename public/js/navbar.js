const hamburgerBtn = document.querySelector('.hamburger-btn')
const mobileNav = document.querySelector('.mobile-nav')
const hamburgerIcon = document.querySelector('.header .hamburger-btn .fa-bars')
const xIcon = document.querySelector('.header .hamburger-btn .fa-xmark')
const openClassName = 'mobile-nav-open'

const closeMobileNav = () => {
    mobileNav.classList.remove(openClassName)
    xIcon.classList.add('hidden')
    hamburgerIcon.classList.remove('hidden')
}

const openMobileNav = () => {
    mobileNav.className = `${mobileNav.className} ${openClassName}`
    xIcon.classList.remove('hidden')
    hamburgerIcon.classList.add('hidden')
}

hamburgerBtn.onclick = () =>
    mobileNav.className.includes(openClassName)
        ? closeMobileNav()
        : openMobileNav()

window.addEventListener('click', e => {
    if (e.target !== hamburgerBtn && e.target !== hamburgerIcon) {
        closeMobileNav()
    }
})
