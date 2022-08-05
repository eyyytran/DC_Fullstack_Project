const mobileCreateBtn = document.getElementById('d-createbtn')
const desktopCreateBtn = document.getElementById('d-dcreatebtn')
const projectList = document.getElementById('d-projects')
const createmodule = document.querySelector('.d-module')
const editmodule = document.querySelector('.de-module')
const cancelbtn = document.querySelector('.d-close')
const submitbtn = document.getElementById('d-submitbtn')
const Esubmitbtn = document.getElementById('de-submitbtn')
const deletebtn = document.querySelector('.de-deleteboard')
const Ecancelbtn = document.querySelector('.de-close')
const mobileSignoutBtn = document.querySelector('#d-logoutbtn')
const desktopSignoutBtn = document.getElementById('d-dlogoutbtn')
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
    const projects = await fetch(
        `${window.location.origin}/projects/get_projects`,
        {
            method: 'GET',
        }
    )
    const data = await projects.json()
    generateProjectCards(data)
}

const openEditModule = e => {
    localStorage.removeItem('projectName')
    localStorage.removeItem('projectId')

    const projectName = e.target.parentNode.offsetParent.innerText
    const projectId = e.target.parentNode.offsetParent.id

    localStorage.setItem('projectName', projectName)
    localStorage.setItem('projectId', projectId)
    editmodule.classList.remove('hidden')
    const currentName = localStorage.getItem('projectName')
    document.querySelector('.de-inputs').value = currentName
}

const editProjectName = async newName => {
    const requestData = {
        id: localStorage.getItem('projectId'),
        name: newName,
    }

    const sendData = await fetch(
        `${window.location.origin}/projects/update_project`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }
    )
}

const createProject = async projectName => {
    const data = {
        name: projectName,
    }
    await fetch(`${window.location.origin}/projects/create_project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

const signOutUser = async () => {
    await fetch(`${window.location.origin}/users/logout`, {
        method: 'PUT',
    })
    localStorage.clear()
    window.location.href = window.location.origin + '/index'
}

const signOutGuest = async () => {
    try {
        const requests = [
            fetch(`${window.location.origin}/users/logout`, {
                method: 'PUT',
            }),
            fetch(`${window.location.origin}/users/destroy_guest`, {
                method: 'DELETE',
            }),
        ]
        const results = await Promise.all(requests)
        localStorage.clear()
        window.location.href = window.location.origin + '/index'
    } catch (err) {
        console.error(err)
    }
}

const deleteProject = async () => {
    const requestData = {
        id: localStorage.getItem('projectId'),
    }
    console.log(requestData)
    const sendData = await fetch(
        `${window.location.origin}/projects/destroy_project`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }
    )
    localStorage.removeItem('projectName')
    localStorage.removeItem('projectId')
}

mobileCreateBtn.addEventListener('click', () => {
    createmodule.classList.remove('hidden')
})

desktopCreateBtn.addEventListener('click', () => {
    createmodule.classList.remove('hidden')
})

submitbtn.addEventListener('click', e => {
    const projectName = document.querySelector('.d-inputs').value
    let isEntryValid = entryValidate(e, projectName)
    if (isEntryValid) {
        createProject(projectName)
        createmodule.classList.add('hidden')
        location.reload()
    }
})

document.querySelector('#new-project').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        const projectName = document.querySelector('.d-inputs').value
        let isEntryValid = entryValidate(e, projectName)
        if (isEntryValid) {
            createProject(projectName)
            createmodule.classList.add('hidden')
            location.reload()
        }
    }
})

cancelbtn.addEventListener('click', () => {
    createmodule.classList.add('hidden')
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
        localStorage.removeItem('projectName')
        localStorage.removeItem('projectId')
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
        createmodule.classList.add('hidden')
        location.reload()
    }
})

document.querySelector('#edit-project').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault()
        const newName = e.target.form[0].value
        let isEntryValid = entryValidate(e, newName)
        if (isEntryValid) {
            editProjectName(newName)
            createmodule.classList.add('hidden')
            location.reload()
        }
    }
})

deletebtn.addEventListener('click', e => {
    e.preventDefault()
    deleteProject()
    createmodule.style.display = 'none'
    location.reload()
})

mobileSignoutBtn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.username === 'guest') {
        signOutGuest()
    } else {
        signOutUser()
    }
})
desktopSignoutBtn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.username === 'guest') {
        signOutGuest()
    } else {
        signOutUser()
    }
})

logo.onclick = () =>
    (window.location.href = window.location.origin + '/dashboard')

window.addEventListener('DOMContentLoaded', () => loadProjects())
