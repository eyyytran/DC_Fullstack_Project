const hamburgerBtn = document.querySelector('.hamburger-btn')
const mobileNav = document.querySelector('.h-container .mobile-nav')
const hamburgerIcon = document.querySelector('.header .hamburger-btn .fa-bars')
const xIcon = document.querySelector('.header .hamburger-btn .fa-xmark')

hamburgerBtn.onclick = () => {
    const openClassName = 'mobile-nav-open'
    if (mobileNav.className.includes(openClassName)) {
        mobileNav.className = mobileNav.className
            .replace(openClassName, '')
            .trim()

        xIcon.classList.add('hidden')
        hamburgerIcon.classList.remove('hidden')
    } else {
        mobileNav.className = `${mobileNav.className} ${openClassName}`
        xIcon.classList.remove('hidden')
        hamburgerIcon.classList.add('hidden')
    }
}
