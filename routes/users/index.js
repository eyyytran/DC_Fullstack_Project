const express = require('express')
const { Users } = require('../../db/models')
const router = express.Router()
const { v4 } = require('uuid')
const bcrypt = require('bcrypt')
const checkLogin = require('../../util/checkLogin')

// user registration
router.post('/register', async (req, res) => {
    const { username, password, email } = await req.body
    try {
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userToCreate = {
            id: v4(),
            username,
            password: hashedPassword,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const user = await Users.create(userToCreate)
        req.session.user = user
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await Users.findOne({
        where: { email: email },
    })
    const validateUser = user.dataValues
    const validated = await bcrypt.compare(password, validateUser.password)
    if (validated) {
        req.session.user = user
        res.status(200).send('login successful')
    } else {
        res.status(400).send('login failed')
    }
})

// update user
router.put('/update_user', checkLogin, async (req, res) => {
    const { email, password, newPassword, newEmail, newUsername } = req.body
    try {
        // find user based on email in our database
        const user = await Users.findOne({ where: { email: email } })
        const validateUser = user.dataValues
        const validated = await bcrypt.compare(password, validateUser.password)
        if (!validated) {
            res.status(400).send('Check email and password')
        } else {
            const salt = await bcrypt.genSalt(5)
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            user.set({
                username: newUsername,
                password: hashedPassword,
                email: newEmail,
                updatedAt: new Date(),
            })
            await user.save()
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(400).send('could not find')
        console.log(error)
    }
})
// delete account
router.delete('/destroy_user', checkLogin, async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({ where: { email: email } })
        const validateUser = user.dataValues
        const validated = await bcrypt.compare(password, validateUser.password)
        if (!validated) {
            res.status(400).send('Check email and password')
        } else {
            user.destroy()
            res.send('User account removed')
        }
    } catch (error) {
        res.status(400).send('could not complete')
        console.log(error)
    }
})
//end session
router.put('/logout', checkLogin, (req, res) => {
    try {
        req.session.user = null
        res.status(200).send('session ended')
    } catch (error) {
        res.status(400).send('could not end session')
        console.log(error)
    }
})

module.exports = router
