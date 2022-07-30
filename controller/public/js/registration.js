const submitBtn = document.getElementById('submit-button')
const form = document.getElementById('form-registration')

//Utility Functions
const isRequired = value => (value === '' ? false : true)

const isLength = (length, min, max) =>
    length < min || length > max ? false : true

const isEmail = email => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
}

const isSecure = password => {
    const re = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    return re.test(password)
}

const checkUsername = e => {
    let valid = false
    const min = 3
    const max = 30
    const username = e.target.form[0].value

    if (!isRequired(username)) {
        showError(e.target.form[0], 'Username cannot be blank')
    } else if (!isLength(username.length, min, max)) {
        showError(
            e.target.form[0],
            'Username must be between 3 and 30 characters'
        )
    } else {
        showSuccess(e.target.form[0])
        valid = true
    }
    return valid
}

const checkEmail = e => {
    let valid = false
    const email = e.target.form[1].value

    if (!isRequired(email)) {
        showError(e.target.form[1], 'Email is required')
    } else if (!isEmail(email)) {
        console.log(isEmail(email))
        showError(e.target.form[1], 'Email is not valid')
    } else {
        showSuccess(e.target.form[1])
        valid = true
    }
    return valid
}

const checkPassword = e => {
    let valid = false
    const password = e.target.form[2].value

    if (!isRequired(password)) {
        showError(e.target.form[2], 'Password required')
    } else if (!isSecure(password)) {
        showError(
            e.target.form[2],
            'Password must be at least 8 characters with 1 lowercase, 1 uppercase, 1 number, and 1 special character (!@#$%^&*)'
        )
    } else {
        showSuccess(e.target.form[2])
        valid = true
    }
    return valid
}

const confirmPassword = e => {
    let valid = false
    const passwordConfirmation = e.target.form[3].value
    const password = e.target.form[2].value

    if (!isRequired(passwordConfirmation)) {
        showError(e.target.form[3], 'Confirm password')
    } else if (password !== passwordConfirmation) {
        showError(e.target.form[3], 'Passwords do not match')
    } else {
        showSuccess(e.target.form[3])
        valid = true
    }
    return valid
}

//Response to User
const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove('success')
    formField.classList.add('error')
    const feedback = formField.querySelector('small')
    feedback.textContent = message
}

const showSuccess = input => {
    const formField = input.parentElement
    formField.classList.remove('error')
    formField.classList.add('success')
    const feedback = formField.querySelector('small')
    feedback.textContent = ''
}

const formValidate = e => {
    let isUsernameValid = checkUsername(e),
        isEmailValid = checkEmail(e),
        isPasswordValid = checkPassword(e),
        confirmPasswordValid = confirmPassword(e)
    // console.log({
    //     isEmailValid,
    //     isPasswordValid,
    //     isUsernameValid,
    //     confirmPasswordValid,
    // })
    let isFormValid =
        isUsernameValid &&
        isPasswordValid &&
        isEmailValid &&
        confirmPasswordValid
    return isFormValid
}

const submitForm = async e => {}

submitBtn.onclick = e => {
    e.preventDefault()
    let isFormValid = formValidate(e)

    if (!isFormValid) {
        console.log('Will not be submitted')
    } else {
        console.log('Will be submitted')
    }
}
