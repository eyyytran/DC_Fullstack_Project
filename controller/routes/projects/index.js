const express = require("express");
const { projects } = require("../../../sequelize/models");
const router = express.Router();

router.post("/create_projects", async (req, res) => {
  res.send("create projects");
});

// project dashboard
// get projects
router.get("/get_projects", async (req, res) => {
  const allProjects = await projects.findAll();
  res.render("projects", {
    locals: { allProjects },
  });
});

router.put("/update_projects", async (req, res) => {
  res.send("update projects");
});

router.delete("/destroy_projects", async (req, res) => {
  res.send("destroy projects");
});

module.exports = router;