console.log('hello world')

const loadCards = async () => {
    const projectID = localStorage.getItem('projectId')
    const requestData = { projectID: projectID }
    try {
        const sendData = await fetch('http://localhost:3001/cards/get_cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        const cards = await sendData.json()
        generateCards(cards)
    } catch (error) {
        alert('could not load your project')
    }
}

const generateCards = list => {
    for (let card = 0; card < list.length; card++) {
        const toDoList = document.getElementById('p-todo-container')
        const doingList = document.getElementById('p-doing-container')
        const reviewList = document.getElementById('p-review-container')
        const completeList = document.getElementById('p-complete-container')

        const cardContainer = document.createElement('div')

        let status = list[card].status

        // const cardContainer = document.createElement('div')
        // const card = document.createElement('div')
        // const editbtn = document.createElement('button')
        // const editbtnimage = document.createElement('img')
        // const content = list[card].name
        // const projectId = list[card].id
        // editbtnimage.src =
        //     'https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png'
        // card.innerHTML = content
        // cardContainer.classList.add(`p-${status}-container`)
        // editbtn.classList.add('p-editbtn')
        // editbtnimage.classList.add('p-editbtn-image')
        // card.classList.add('p-project-card')
        // card.setAttribute('id', projectId)

        // projectList.append(card)
        // card.append(editbtn)
        // editbtn.append(editbtnimage)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadCards()
})
