//TODO Add instant feedback on form.addeventlisterner with a debounce
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
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$'
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

//Validations
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
            'Password must be 8-50 characters with 1 lowercase, 1 uppercase, 1 number, and 1 special character (!@#$%^&*)'
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

const debounce = (fn, delay = 500) => {
    let timeoutId
    return (...args) => {
        //clear timer
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        //set new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay)
    }
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

//Forms and Submissions
const formValidate = e => {
    let isUsernameValid = checkUsername(e),
        isEmailValid = checkEmail(e),
        isPasswordValid = checkPassword(e),
        confirmPasswordValid = confirmPassword(e)
    console.log({
        isEmailValid,
        isPasswordValid,
        isUsernameValid,
        confirmPasswordValid,
    })
    let isFormValid =
        isUsernameValid &&
        isPasswordValid &&
        isEmailValid &&
        confirmPasswordValid
    return isFormValid
}

const submitForm = async e => {
    const Username = e.target.form[0].value
    const Email = e.target.form[1].value
    const Password = e.target.form[2].value
    const data = {
        username: Username,
        password: Password,
        email: Email,
        // createdAt: new Date(),
        // updatedAt: new Date(),
    }
    console.log(data)
    const package = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Got a non 200 response from API server')
            }
            return response.json()
        })
        .then(data => {
            console.log('Success: ', data)
        })
        .catch(error => {
            console.error('Error: ')
        })
}

submitBtn.onclick = e => {
    e.preventDefault()
    let isFormValid = formValidate(e)

    if (!isFormValid) {
        console.log('Will not be submitted')
    } else {
        console.log('Will be submitted')
        submitForm(e)
    }
}
