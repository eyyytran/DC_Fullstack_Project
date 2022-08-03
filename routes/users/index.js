const express = require("express");
const { Users, UserProjects, Projects, Cards } = require("../../db/models");
const router = express.Router();
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
// validate user function
const checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render("template", {
      locals: {
        title: getTitle("index"),
        script: getScript("index"),
      },
      partials: {
        partial: "index",
      },
    });
  }
};

router.post("/register", async (req, res) => {
  const { username, password, email } = await req.body;
  try {
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userToCreate = {
      id: v4(),
      username,
      password: hashedPassword,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = await Users.create(userToCreate);
    req.session.user = user;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { email: email },
  });
  const validateUser = user.dataValues;
  const validated = await bcrypt.compare(password, validateUser.password);
  if (validated) {
    req.session.user = user;
    res.status(200).send(user);
  } else {
    res.status(400).send("error");
  }
});

router.put("/update_user", checkLogin, async (req, res) => {
  const { email, password, newPassword, newEmail, newUsername } = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    const validateUser = user.dataValues;
    const validated = await bcrypt.compare(password, validateUser.password);
    if (!validated) {
      res.status(400).send("invalid user");
    } else {
      const salt = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.set({
        username: newUsername,
        password: hashedPassword,
        email: newEmail,
        updatedAt: new Date(),
      });
      await user.save();
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send("error");
  }
});

router.delete("/destroy_user", checkLogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    const validateUser = user.dataValues;
    const validated = await bcrypt.compare(password, validateUser.password);
    if (!validated) {
      res.status(400).send("invalid user");
    } else {
      user.destroy();
      res.status(200).send("destroyed");
    }
  } catch (error) {
    res.status(400).send("error");
  }
});

// This will work for now but it would be better if the guest had a randomly
// generated email so there could be more than one guest account open at a time
router.delete("/destroy_guest", async (req, res) => {
  try {
    const guest = await Users.findOne({
      where: { email: "destroyguest@destroy.com" },
    });
    const allProjectIDs = await UserProjects.findAll({
      where: { userID: guest.id },
      attributes: ["projectID"],
    });
    await UserProjects.destroy({ where: { userID: guest.id } });
    for (let index = 0; index < allProjectIDs.length; index++) {
      const projectID = allProjectIDs[index].dataValues.projectID;
      await Cards.destroy({ where: { projectID: projectID } });
      await Projects.destroy({ where: { id: projectID } });
    }
    await guest.destroy();
    res.status(200).send("guest destroyed");
  } catch (error) {
    res.status(400).send("error");
  }
});

router.put("/logout", checkLogin, (req, res) => {
  try {
    req.session.user = null;
    res.status(200).send("session ended");
  } catch (error) {
    res.status(400).send("error");
  }
});

module.exports = router;
