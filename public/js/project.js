const signoutbtn = document.querySelector('#p-logoutbtn')
const toDoList = document.getElementById('todo')
const doingList = document.getElementById('inprogress')
const reviewList = document.getElementById('review')
const completeList = document.getElementById('complete')

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
        console.log(typeof cards)
        generateCards(cards)
    } catch (error) {
        alert('could not load your project')
    }
}

const generateCards = list => {
    for (let i = 0; i < list.length; i++) {
        const status = list[i].status.toLowerCase()
        const card = document.createElement('div')
        const editbtn = document.createElement('button')
        const editbtnimage = document.createElement('img')
        const content = list[i].name
        const cardId = list[i].id.toString()
        editbtnimage.src =
            'https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png'
        card.innerHTML = content

        editbtn.classList.add('p-editbtn')
        editbtnimage.classList.add('p-editbtn-image')
        card.classList.add(`${status}`)
        card.setAttribute('id', cardId)
        if (status === 'todo') {
            toDoList.append(card)
            card.append(editbtn)
            editbtn.append(editbtnimage)
        } else if (status === 'inprogress') {
            doingList.append(card)
            card.append(editbtn)
            editbtn.append(editbtnimage)
        } else if (status === 'review') {
            reviewList.append(card)
            card.append(editbtn)
            editbtn.append(editbtnimage)
        } else {
            completeList.append(card)
            card.append(editbtn)
            editbtn.append(editbtnimage)
        }

        console.log('I made it')
    }
}

signoutbtn.addEventListener('click', () => {
    signOutUser()
})

window.addEventListener('DOMContentLoaded', () => {
    loadCards()
})
