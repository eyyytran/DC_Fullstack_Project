const express = require('express')
const { cards } = require('../../db/models')
const router = express.Router()

router.post('/create_cards', async (req, res) => {
    res.send('create cards')
})

// project page
// get cards
router.get('/get_cards', async (req, res) => {
    const allCards = await cards.findAll()
    res.render('cards', {
        locals: { allCards },
    })
})

router.put('/update_cards', async (req, res) => {
    res.send('update cards')
})

router.delete('/destroy_cards', async (req, res) => {
    res.send('destroy cards')
})

module.exports = router
