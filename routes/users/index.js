const express = require('express')
const { Users, Cards, Projects, UserProjects } = require('../../db/models')
const router = express.Router()
const { v4 } = require('uuid')
const bcrypt = require('bcrypt')
const checkLogin = require('../../util/checkLogin')
// user registration
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return res.status(400).send('registration failed')
    }

    try {
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await Users.create({
            id: v4(),
            username,
            password: hashedPassword,
            email: email.toLowerCase(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        req.session.user = user
        const userResponse = { ...user.dataValues }
        delete userResponse.password
        res.status(200).json(userResponse)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('login failed')
    }

    const user = await Users.findOne({
        where: { email: req.body.email?.toLowerCase?.() },
    })

    if (!user?.dataValues?.password) {
        return res.status(400).send('login failed')
    }

    const validated = await bcrypt.compare(
        req.body.password,
        user.dataValues.password
    )

    if (!validated) {
        return res.status(400).send('login failed')
    }

    req.session.user = user
    const userResponse = { ...user.dataValues }
    delete userResponse.password
    res.status(200).json(userResponse)
})

router.put('/update_user', checkLogin, async (req, res) => {
    const { email, password, newPassword, newEmail, newUsername } = req.body
    try {
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
    }
})

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
    }
})
// delete guest account and everything associated
router.delete('/destroy_guest', checkLogin, async (req, res) => {
    try {
        if (req.session.user.username === 'guest') {
            const guest = await Users.findByPk(req.session.user.id)
            const allProjectIDs = await UserProjects.findAll({
                where: { userID: guest.id },
                attributes: ['projectID'],
            })
            await UserProjects.destroy({ where: { userID: guest.id } })
            for (let index = 0; index < allProjectIDs.length; index++) {
                const projectID = allProjectIDs[index].dataValues.projectID
                await Cards.destroy({ where: { projectID: projectID } })
                await Projects.destroy({ where: { id: projectID } })
            }
            await guest.destroy()
            res.status(200).send('guest destroyed')
        }
    } catch (error) {
        res.status(400).send('error')
    }
})

router.put('/logout', checkLogin, (req, res) => {
    try {
        req.session.user = null
        res.status(200).send('session ended')
    } catch (error) {
        res.status(400).send('could not end session')
    }
})

module.exports = router
