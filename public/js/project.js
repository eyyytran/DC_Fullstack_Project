const signoutbtn = document.querySelector('#p-logoutbtn')
const toDoList = document.getElementById('p-todo-list')
const doingList = document.getElementById('p-inprogress-list')
const reviewList = document.getElementById('p-review-list')
const completeList = document.getElementById('p-complete-list')
const editmodule = document.querySelector('.pe-module')
const Esubmitbtn = document.querySelector('#pe-submitbtn')
const movebtn = document.querySelector('.pe-movebtn')

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
        const cardcontent = document.createElement('div')
        const content = list[i].name
        const cardId = list[i].id.toString()
        editbtnimage.src =
            'https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png'
        cardcontent.innerHTML = content

        cardcontent.classList.add('p-card-content')
        editbtn.classList.add('p-editbtn')
        editbtnimage.classList.add('p-editbtn-image')
        card.classList.add('p-card')
        card.setAttribute('id', cardId)
        if (status === 'todo') {
            toDoList.append(card)
            card.append(cardcontent)
            card.append(editbtn)
            editbtn.append(editbtnimage)
        } else if (status === 'inprogress') {
            doingList.append(card)
            card.append(cardcontent)
            card.append(editbtn)
            editbtn.append(editbtnimage)
        } else if (status === 'review') {
            reviewList.append(card)
            card.append(cardcontent)
            card.append(editbtn)
            editbtn.append(editbtnimage)
        } else {
            completeList.append(card)
            card.append(cardcontent)
            card.append(editbtn)
            editbtn.append(editbtnimage)
        }

        console.log('I made it')
    }
}

const openEditModule = e => {
    localStorage.removeItem('cardName')
    localStorage.removeItem('cardId')

    const cardName = e.target.parentNode.offsetParent.innerText
    const cardId = e.target.parentNode.offsetParent.id

    localStorage.setItem('cardName', cardName)
    localStorage.setItem('cardId', cardId)
    editmodule.style.display = 'block'
    const currentName = localStorage.getItem('cardName')
    document.querySelector('.pe-inputs').value = currentName
}

const editCardDesc = async newName => {
    const requestData = {
        id: localStorage.getItem('cardId'),
        name: newName,
    }
    const sendData = await fetch('http://localhost:3001/cards/update_card', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    alert('Successfully updated your task')
}

const editCardStatus = async newStatus => {
    const requestData = {
        id: localStorage.getItem('cardId'),
        status: newStatus,
    }
    const sendData = await fetch('http://localhost:3001/cards/update_card', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    alert('Successfully updated your task')
}

const signOutUser = async () => {
    try {
        const signOutRequest = await fetch(
            'http://localhost:3001/users/logout',
            { method: 'PUT' }
        )
        alert('Your session has ended')
        localStorage.clear()
        window.location.href = 'http://localhost:3001/'
    } catch (error) {
        alert('Could not end user session')
    }
}

signoutbtn.addEventListener('click', () => {
    signOutUser()
})

document.addEventListener('click', e => {
    if (
        e.target.className === 'p-editbtn' ||
        e.target.className === 'p-editbtn-image'
    ) {
        openEditModule(e)
    }
})

Esubmitbtn.addEventListener('click', e => {
    e.preventDefault()
    const newName = e.target.form[0].value
    editCardDesc(newName)
    editmodule.style.display = 'none'
    location.reload()
})

movebtn.addEventListener('click', e => {
    e.preventDefault()
    editCardStatus(newStatus)
})

window.addEventListener('DOMContentLoaded', () => {
    loadCards()
})
