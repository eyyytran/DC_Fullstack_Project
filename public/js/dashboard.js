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

const createProject = async () => {
    const projectName = document.querySelector('.d-inputs').value
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
            { method: 'PUT' }
        )
        alert('Your session has ended')
        window.location.href = 'http://localhost:3001/index'
    } catch (error) {
        alert('Could not end user session')
    }
}

createbtn.addEventListener('click', () => {
    createmodule.style.display = 'block'
})

submitbtn.addEventListener('click', () => {
    createProject()
    createmodule.style.display = 'none'
    location.reload()
})

cancelbtn.addEventListener('click', () => {
    createmodule.style.display = 'none'
})

document.addEventListener('click', e => {
    if (
        e.target.className === 'd-editbtn' ||
        e.target.className === 'd-editbtn-image'
    ) {
        editmodule.style.display = 'block'
    }
})

Esubmitbtn.addEventListener('click', e => {
    console.log(e.target.parentNode)
})

signoutbtn.addEventListener('click', () => {
    signOutUser()
})

window.addEventListener('DOMContentLoaded', () => loadProjects())
