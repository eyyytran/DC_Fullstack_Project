const createbtn = document.getElementById('d-createbtn')
const projectList = document.getElementById('d-projects')
const createmodule = document.querySelector('.d-module')
const cancelbtn = document.querySelector('.d-close')
const submitbtn = document.getElementById('d-submitbtn')

const generateCards = list => {
    for (let project = 0; project < list.length; project++) {
        const card = document.createElement('button')
        const content = list[project].name
        card.innerHTML = content
        card.classList.add('d-project-card')
        projectList.append(card)
    }
}

const loadProjects = async () => {
    try {
        const projects = await fetch(
            'http://localhost:3001/projects/get_projects',
            { method: 'GET' }
        )
        const data = await projects.json()
        generateCards(data)
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

createbtn.addEventListener('click', () => {
    createmodule.style.display = 'block'
})

submitbtn.addEventListener('click', () => {
    createProject()
    createmodule.style.display = 'none'
})

cancelbtn.addEventListener('click', () => {
    createmodule.style.display = 'none'
})

window.addEventListener('DOMContentLoaded', () => loadProjects())
