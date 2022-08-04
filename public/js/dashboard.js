const createbtn = document.getElementById('d-createbtn')
const projectList = document.getElementById('d-projects')
const createmodule = document.querySelector('.d-module')
const editmodule = document.querySelector('.de-module')
const cancelbtn = document.querySelector('.d-close')
const submitbtn = document.getElementById('d-submitbtn')
const Esubmitbtn = document.getElementById('de-submitbtn')
const deletebtn = document.querySelector('.de-deleteboard')
const Ecancelbtn = document.querySelector('.de-close')
const signoutbtn = document.querySelector('#d-logoutbtn')
const logo = document.getElementById('logo-redirect')

//validators
const isRequired = value => (value === '' ? false : true)

const isLength = (length, min, max) =>
    length < min || length > max ? false : true

const checkEntry = (e, name) => {
    let valid = false
    const min = 3
    const max = 30

    if (!isRequired(name)) {
        showError(e.target.form[1], 'Please enter a password')
    } else if (!isLength(name.length, min, max)) {
        showError(e.target.form[1], 'Project names are 3 to 30 characters long')
    } else {
        showSuccess(e.target.form[1])
        valid = true
    }
    return valid
}

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

const entryValidate = (e, name) => {
    let isEntryValid = checkEntry(e, name)

    return isEntryValid
}

const generateProjectCards = list => {
    for (let project = 0; project < list.length; project++) {
        const card = document.createElement('div')
        const editbtn = document.createElement('button')
        const editbtnimage = document.createElement('img')
        const content = list[project].name
        const projectId = list[project].id
        editbtnimage.src =
            'https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png'
        card.innerHTML = content

        editbtn.classList.add('d-editbtn')
        editbtnimage.classList.add('d-editbtn-image')
        card.classList.add('d-project-card')
        card.setAttribute('id', projectId)

        projectList.append(card)
        card.append(editbtn)
        editbtn.append(editbtnimage)
    }
}

const loadProjects = async () => {
    try {
        const projects = await fetch(
            'http://localhost:3001/projects/get_projects',
            { method: 'GET' }
        )
        const data = await projects.json()
        generateProjectCards(data)
    } catch (error) {
        alert('could not fetch projects')
    }
}

const openEditModule = e => {
    localStorage.clear()

    const projectName = e.target.parentNode.offsetParent.innerText
    const projectId = e.target.parentNode.offsetParent.id

    localStorage.setItem('projectName', projectName)
    localStorage.setItem('projectId', projectId)
    editmodule.style.display = 'block'
    const currentName = localStorage.getItem('projectName')
    document.querySelector('.de-inputs').value = currentName
}

const editProjectName = async newName => {
    const requestData = {
        id: localStorage.getItem('projectId'),
        name: newName,
    }
    try {
        const sendData = await fetch(
            'http://localhost:3001/projects/update_project',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }
        )
        alert('Successfully updated your project name')
    } catch (error) {
        console.log(error)
    }
}

const createProject = async projectName => {
    const data = {
        name: projectName,
    }
    try {
        const sendData = await fetch(
            'http://localhost:3001/projects/create_project',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
        alert('created the project')
    } catch (error) {
        alert('unable to create project')
    }
}

const signOutUser = async () => {
    try {
        const signOutRequest = await fetch(
            'http://localhost:3001/users/logout',
            {
                method: 'PUT',
            }
        )
        alert('Your session has ended')
        localStorage.clear()
        window.location.href = window.location.origin + '/index'
    } catch (error) {
        alert('Could not end user session')
    }
}

const deleteProject = async () => {
    const requestData = {
        id: localStorage.getItem('projectId'),
    }
    console.log(requestData)
    const sendData = await fetch(
        'http://localhost:3001/projects/destroy_project',
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }
    )
    localStorage.clear()
}

createbtn.addEventListener('click', () => {
    createmodule.style.display = 'block'
})

submitbtn.addEventListener('click', e => {
    const projectName = document.querySelector('.d-inputs').value
    let isEntryValid = entryValidate(e, projectName)
    if (isEntryValid) {
        createProject(projectName)
        createmodule.style.display = 'none'
        location.reload()
    }
})

cancelbtn.addEventListener('click', () => {
    createmodule.style.display = 'none'
    console.log('cancel button')
})

document.addEventListener('click', e => {
    if (
        e.target.className === 'd-editbtn' ||
        e.target.className === 'd-editbtn-image'
    ) {
        openEditModule(e)
    }
    if (e.target.className === 'd-project-card') {
        localStorage.clear()
        localStorage.setItem('projectName', e.target.innerText)
        localStorage.setItem('projectId', e.target.id)
        window.location.href = window.location.origin + '/project'
    }
})

Esubmitbtn.addEventListener('click', e => {
    e.preventDefault()
    const newName = e.target.form[0].value
    let isEntryValid = entryValidate(e, newName)
    if (isEntryValid) {
        editProjectName(newName)
        createmodule.style.display = 'none'
        location.reload()
    }
})

deletebtn.addEventListener('click', e => {
    e.preventDefault()
    deleteProject()
    createmodule.style.display = 'none'
    location.reload()
})

signoutbtn.addEventListener('click', () => {
    signOutUser()
})

logo.onclick = () =>
    (window.location.href = window.location.origin + '/dashboard')

window.addEventListener('DOMContentLoaded', () => loadProjects())
