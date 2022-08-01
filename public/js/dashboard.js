const createbtn = document.getElementById('d-createbtn')
const card = document.getElementById('d-project-card')

card.addEventListener('click', () => console.log('I got clicked too'))

createbtn.addEventListener('click', () => console.log('I got clicked'))

window.addEventListener('DOMContentLoaded', console.log('the page has loaded'))

// const loadProjects = async () => {
//     const projects = await fetch('http://localhost:3001/projects/get_projects')

// }