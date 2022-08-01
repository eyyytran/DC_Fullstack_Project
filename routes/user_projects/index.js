const express = require("express");
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

module.exports = router;
