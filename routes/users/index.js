const express = require('express')
const { Users } = require('../../db/models')
const router = express.Router()
const { v4 } = require('uuid')
const bcrypt = require('bcrypt')

// user registration
router.post('/register', async (req, res) => {
    // console.log("register endpoint runs...");
    // console.log({ resHeaders: res.headers });
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
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
// login
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const currentUser = await Users.findOne({
            where: { username: username },
        })
        const validateUser = currentUser.dataValues
        const validated = await bcrypt.compare(password, validateUser.password)
        if (!validated) {
            res.status(400)
                .send('Check username and password')
                .redirect('/login')
        } else {
            res.status(200).send('Sucessful login')
        }
    } catch (error) {
        res.send('could not find')
    }
})
// update user
router.put('/update_user', async (req, res) => {
    const { email, password, newPassword, newEmail, newUsername } = req.body
    try {
        // find user based on email in our database
        const currentUser = await Users.findOne({ where: { email: email } })
        const validateUser = currentUser.dataValues
        const validated = await bcrypt.compare(password, validateUser.password)
        if (!validated) {
            res.status(400).send('Check email and password')
        } else {
            const salt = await bcrypt.genSalt(5)
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            currentUser.set({
                username: newUsername,
                password: hashedPassword,
                email: newEmail,
            })
            await currentUser.save()
            res.status(200).send('User updated')
        }
    } catch (error) {
        res.send('could not find')
    }
})
// delete account
router.delete('/destroy_user', async (req, res) => {
    const { email, password } = req.body
    try {
        const currentUser = await Users.findOne({ where: { email: email } })
        const validateUser = currentUser.dataValues
        const validated = await bcrypt.compare(password, validateUser.password)
        if (!validated) {
            res.status(400).send('Check email and password')
        } else {
            currentUser.destroy()
            res.send('User destroyed')
        }
    } catch (error) {
        res.send('could not destroy')
    }
})
module.exports = router
