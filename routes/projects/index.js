const express = require('express')
const { v4 } = require('uuid')
const { UserProjects, Projects } = require('../../db/models')
const router = express.Router()

router.post('/create_project', async (req, res) => {
    const { name, image } = await req.body
    try {
        const newProject = {
            id: v4(),
            name,
            image,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const project = await Projects.create(newProject)
        res.status(200).send(project)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/get_projects', async (req, res) => {
    const userID = req.session.user.id
    const allProjectIDs = await UserProjects.findAll({
        where: { userID: userID },
        attributes: ['projectID'],
    })
    const allProjects = []
    for (let index = 0; index < allProjectIDs.length; index++) {
        const projectID = allProjectIDs[index].dataValues.projectID
        const project = await Projects.findOne({ where: { id: projectID } })
        allProjects.push(project.dataValues)
    }
    res.json(allProjects)
})

router.put('/update_project', async (req, res) => {
    const { id, name, image } = req.body
    try {
        const currentProject = await Projects.findOne({ where: { id: id } })
        currentProject.set({
            name,
            image,
            updatedAt: new Date(),
        })
        await currentProject.save()
        res.status(200).send(currentProject)
    } catch (error) {
        res.send('could not find')
    }
})

router.delete('/destroy_projects', async (req, res) => {
    const { id } = req.body
    try {
        const currentProject = await Projects.findOne({ where: { id: id } })
        currentProject.destroy()
        res.send('Project destroyed')
    } catch (error) {
        res.send('could not destroy')
    }
})

module.exports = router
