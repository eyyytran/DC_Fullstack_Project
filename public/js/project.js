const mobileSignOutBtn = document.querySelector('#p-logoutbtn')
const desktopSignoutBtn = document.getElementById('p-dlogoutbtn')
const toDoList = document.getElementById('p-todo-list')
const doingList = document.getElementById('p-inprogress-list')
const reviewList = document.getElementById('p-review-list')
const completeList = document.getElementById('p-complete-list')
const createmodule = document.querySelector('.p-module')
const editmodule = document.querySelector('.pe-module')
const Csubmitbtn = document.getElementById('p-submitbtn')
const Esubmitbtn = document.querySelector('#pe-submitbtn')
const cancelbtn = document.querySelector('.p-close')
const movebtn = document.querySelector('.pe-movebtn')
const deletebtn = document.querySelector('.pe-deletebtn')
const moveoptions = document.querySelector('#pe-moveoptions')
const logo = document.getElementById('logo-redirect')

//validate
const isRequired = value => (value === '' ? false : true)

const isLength = (length, min, max) =>
    length < min || length > max ? false : true

const checkEntry = (e, name) => {
    let valid = false
    const min = 3
    const max = 50

    if (!isRequired(name)) {
        showError(e.target.form[1], 'Please enter a password')
    } else if (!isLength(name.length, min, max)) {
        showError(
            e.target.form[1],
            'Please enter something 3 to 50 characters long.'
        )
    } else {
        showSuccess(e.target.form[1])
        valid = true
    }
    return valid
}

const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove('success')
    formField.classList.add('error')
    const feedback = formField.querySelector('small')
    feedback.textContent = message
}

const showSuccess = input => {
    const formField = input.parentElement
    formField.classList.remove('error')
    formField.classList.add('success')
    const feedback = formField.querySelector('small')
    feedback.textContent = ''
}

const entryValidate = (e, name) => {
    let isEntryValid = checkEntry(e, name)

    return isEntryValid
}

const loadCards = async () => {
    const projectID = localStorage.getItem('projectId')
    const requestData = { projectID: projectID }

    const sendData = await fetch(`${window.location.origin}/cards/get_cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    const cards = await sendData.json()
    generateCards(cards)
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
    }
}

const renderProjectName = () => {
    const projectName = localStorage.getItem('projectName')
    const projectTitle = document.querySelector('.p-projectname')
    projectTitle.innerHTML = projectName
}

const openEditModule = e => {
    localStorage.removeItem('cardName')
    localStorage.removeItem('cardId')
    localStorage.removeItem('cardStatus')

    const cardName = e.target.parentNode.offsetParent.innerText
    const cardId = e.target.parentNode.offsetParent.id
    const cardStatus = e.path[4].id

    localStorage.setItem('cardName', cardName)
    localStorage.setItem('cardId', cardId)
    localStorage.setItem('cardStatus', cardStatus)

    editmodule.classList.remove('hidden')
    const currentName = localStorage.getItem('cardName')
    document.querySelector('.pe-inputs').value = currentName
}

const openCreateModule = e => {
    localStorage.removeItem('cardStatus')
    localStorage.setItem('cardStatus', e.target.name)
    createmodule.classList.remove('hidden')
}

const createCard = async cardName => {
    const newStatus = localStorage.getItem('cardStatus')
    const projectID = localStorage.getItem('projectId')
    const data = {
        listPosition: 1,
        name: cardName,
        status: newStatus,
        projectID: projectID,
    }

    const sendData = await fetch(
        `${window.location.origin}/cards/create_card`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    )
}

const editCardDesc = async newName => {
    const requestData = {
        id: localStorage.getItem('cardId'),
        name: newName,
    }
    const sendData = await fetch(
        `${window.location.origin}/cards/update_card`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }
    )
}

const editCardStatus = async () => {
    const newStatus = moveoptions.value
    const requestData = {
        id: localStorage.getItem('cardId'),
        status: newStatus,
    }

    const sendData = await fetch(
        `${window.location.origin}/cards/update_card`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }
    )
}

const deleteCard = async () => {
    const requestData = {
        id: localStorage.getItem('cardId'),
    }

    const sendData = await fetch(
        `${window.location.origin}/cards/destroy_card`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }
    )
    localStorage.removeItem('cardId')
    localStorage.removeItem('cardName')
}

const signOutUser = async () => {
    const signOutRequest = await fetch(
        `${window.location.origin}/users/logout`,
        {
            method: 'PUT',
        }
    )
    localStorage.clear()
    window.location.href = window.location.origin
}

const signOutGuest = async () => {
    try {
        const requests = [
            fetch(`${window.location.origin}/users/logout`, {
                method: 'PUT',
            }),
            fetch(`${window.location.origin}/users/destroy_guest`, {
                method: 'DELETE',
            }),
        ]
        const results = await Promise.all(requests)
        localStorage.clear()
        window.location.href = window.location.origin + '/index'
    } catch (err) {
        console.error(err)
    }
}

const setSelectorOptions = () => {
    const currentStatus = localStorage.getItem('cardStatus')
    moveoptions.value = currentStatus
}

mobileSignOutBtn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.username === 'guest') {
        signOutGuest()
    } else {
        signOutUser()
    }
})

desktopSignoutBtn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.username === 'guest') {
        signOutGuest()
    } else {
        signOutUser()
    }
})

document.addEventListener('click', e => {
    if (
        e.target.className === 'p-editbtn' ||
        e.target.className === 'p-editbtn-image'
    ) {
        openEditModule(e)
    }
    if (e.target.className === 'p-createbtnimg') {
        openCreateModule(e)
    }
})

document.querySelector('#new-card').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault()
        const cardName = document.querySelector('.p-inputs').value
        let isEntryValid = entryValidate(e, cardName)
        if (isEntryValid) {
            createCard(cardName)
            createmodule.classList.add('hidden')
            location.reload()
        }
    }
})

Csubmitbtn.addEventListener('click', e => {
    e.preventDefault()
    const cardName = document.querySelector('.p-inputs').value
    let isEntryValid = entryValidate(e, cardName)
    if (isEntryValid) {
        createCard(cardName)
        createmodule.classList.add('hidden')
        location.reload()
    }
})

document.querySelector('#edit-card').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault()
        const newName = e.target.form[0].value
        let isEntryValid = entryValidate(e, newName)
        if (isEntryValid) {
            editCardDesc(newName)
            editCardStatus()
            editmodule.classList.add('hidden')
            location.reload()
        }
    }
})

Esubmitbtn.addEventListener('click', e => {
    const newName = e.target.form[0].value
    let isEntryValid = entryValidate(e, newName)
    if (isEntryValid) {
        editCardDesc(newName)
        editCardStatus()
        editmodule.classList.add('hidden')
        location.reload()
    }
})

movebtn.addEventListener('click', e => {
    e.preventDefault()
    movebtn.classList.add('hidden')
    moveoptions.classList.remove('hidden')
    setSelectorOptions()
})

deletebtn.addEventListener('click', e => {
    e.preventDefault()
    deleteCard()
    editmodule.classList.add('hidden')
    location.reload()
})

cancelbtn.addEventListener('click', () => {
    createmodule.classList.add('hidden')
})

logo.onclick = () =>
    (window.location.href = window.location.origin + '/dashboard')

window.addEventListener('DOMContentLoaded', () => {
    loadCards()
    renderProjectName()
})
