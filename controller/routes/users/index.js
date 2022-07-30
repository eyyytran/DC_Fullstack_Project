const express = require("express");
const { Users } = require("../../../sequelize/models");
const router = express.Router();
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

// user registration
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
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
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
// login
router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUser = await user.findOne({ where: { username: username } });
    const userWeFound = findUser.dataValues;
    const validated = await bcrypt.compare(password, userWeFound.password);
    if (!validated) {
      res.status(400).send("Check username and password").redirect("/login");
    } else {
      res.status(200).send("Sucessful login");
    }
  } catch (error) {
    res.send("could not find username");
  }
});

// update user password
router.put("/update_password", async (req, res) => {
  const { username, password, newPassword } = req.body;
  try {
    // find user based on username in our database
    const findUser = await user.findOne({ where: { username: username } });
    const userWeFound = findUser.dataValues;
    const validated = await bcrypt.compare(password, userWeFound.password);
    if (!validated) {
      res.status(400).send("Check username and password").redirect("/login");
    } else {
      const salt = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      findUser.password = hashedPassword;
      await findUser.save();
      res.status(200).send("Password updated");
    }
  } catch (error) {
    res.send("could not find username");
  }
});
// delete account
router.delete("/delete_account", async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUser = await user.findOne({ where: { username: username } });
    const userWeFound = findUser.dataValues;
    const validated = await bcrypt.compare(password, userWeFound.password);
    if (!validated) {
      res.status(400).send("Check username and password").redirect("/login");
    } else {
      res.status(200).send("Sucessful login");
    }
  } catch (error) {
    res.send("could not find username");
  }
});

module.exports = router;
