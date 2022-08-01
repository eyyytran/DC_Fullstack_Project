const express = require("express");
const app = express();
const { UserProjects, Projects } = require("../../db/models");
const router = express.Router();

router.post("/create_join", async (req, res) => {
  const { userID, projectID } = req.body;
  try {
    const newJoin = {
      userID,
      projectID,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const join = await UserProjects.create(newJoin);
    res.status(200).send(join);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/get_projects", async (req, res) => {
  const { userID } = req.body;
  const allProjectIDs = await UserProjects.findAll({
    where: { userID: userID },
    attributes: ["projectID"],
  });
  console.log(allProjectIDs);
  const allProjects = [];
  for (let index = 0; index < allProjectIDs.length; index++) {
    const projectID = allProjectIDs[index].projectID;
    const project = await Projects.findOne({ where: { id: projectID } });
    allProjects.push(project);
    console.log(allProjects);
  }
  res.render("dashboard", {
    locals: { allProjects },
  });
});

module.exports = router;
