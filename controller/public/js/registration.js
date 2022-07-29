const submitBtn = document.getElementById('submit-button')
const form = document.getElementById('form-registration')

const formValidate = e => {
    const username = e.target.form[0].value
    const email = e.target.form[1].value
    const password = e.target.form[2].value
    const passwordConfirmation = e.target.form[3].value
    console.log({ username, email, password, passwordConfirmation })
}

form.addEventListener('submit', e => {
    e.preventDefault()
})

submitBtn.onclick = e => formValidate(e)
