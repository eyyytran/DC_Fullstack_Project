const createbtn = document.getElementById('d-createbtn')
const projectList = document.getElementById('d-projects')
const createmodule = document.querySelector('.d-module')
const cancelbtn = document.querySelector('.d-close')
const submitbtn = document.querySelector('.d-submitbtn')

const generateProjectCards = list => {
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
        generateProjectCards(data)
    } catch (error) {
        alert('could not fetch projects')
    }
}

const createProject = async e => {
    const name = e.target.form[0].value
    const data = {
        name
    }
    try {
        const newProject = await fetch(
            'http:localhost:3001/projects/create_project',
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        alert("New Project Created")

    } catch (error) {
        alert('Unable to create project')
    }
}

createbtn.addEventListener('click', () => {
    createmodule.style.display = 'block'
})

cancelbtn.addEventListener('click', () => {
    createmodule.style.display = 'none'
})

submitbtn.addEventListener('click', () => createProject())

window.addEventListener('DOMContentLoaded', () => loadProjects())
