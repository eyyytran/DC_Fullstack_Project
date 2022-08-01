const createbtn = document.getElementById('d-createbtn')
const card = document.getElementsByClassName('d-project-card')

card.addEventListener('click', () => console.log('I got clicked too'))

createbtn.addEventListener('click', () => console.log('I got clicked'))

window.addEventListener('DOMContentLoaded', () => loadProjects())

// const loadProjects = async () => {
//     const projects = await fetch('http://localhost:3001/projects/get_projects')

// }
