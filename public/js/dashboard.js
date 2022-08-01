const createbtn = document.getElementById('d-createbtn')
const card = document.getElementsByClassName('d-project-card')

createbtn.addEventListener('click', () => console.log('I got clicked'))

const loadProjects = async () => {
    try {
        const projects = await fetch(
            'http://localhost:3001/projects/get_projects',
            { method: 'GET' }
        )
        const data = await projects.json()
        data.map(project => )
    } catch (error) {
        alert('could not fetch projects')
    }
}

window.addEventListener('DOMContentLoaded', () => loadProjects())
