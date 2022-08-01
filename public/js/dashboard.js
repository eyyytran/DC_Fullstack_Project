const createbtn = document.getElementById('d-createbtn')
const projectList = document.getElementById('d-projects')
console.log(projectList)

createbtn.addEventListener('click', () => console.log('I got clicked'))

const generateCards = list => {
    for (let project = 0; project < list.length; project++) {
        const card = document.createElement('div')
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

window.addEventListener('DOMContentLoaded', () => loadProjects())
