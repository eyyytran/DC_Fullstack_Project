const express = require("express");
const { Cards } = require("../../db/models");
const router = express.Router();
const { v4 } = require("uuid");

router.post("/create_card", async (req, res) => {
  const { listPosition, name, status, projectID } = req.body;
  const userID = req.session.user.id;
  try {
    newCard = {
      id: v4(),
      listPosition,
      name,
      status,
      userID,
      projectID,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const card = await Cards.create(newCard);
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("error", error);
  }
});

router.post("/get_cards", async (req, res) => {
  const { projectID } = req.body;
  try {
    const allCards = await Cards.findAll({
      where: { projectID: projectID },
    });
    res.status(200).json(allCards);
  } catch (error) {
    res.status(400).send("error", error);
  }
});

router.put("/update_card", async (req, res) => {
  const { id, listPosition, name, description, status, userID } = req.body;
  try {
    const currentCard = await Cards.findOne({ where: { id: id } });
    currentCard.set({
      listPosition: listPosition,
      name: name,
      description: description,
      status: status,
      userID: userID,
      updatedAt: new Date(),
    });
    const card = await currentCard.save();
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("error", error);
  }
});

router.delete("/destroy_card", async (req, res) => {
  const { id } = req.body;
  try {
    const currentCard = await Cards.findOne({ where: { id: id } });
    currentCard.destroy();
    res.status(200).send("destroyed");
  } catch (error) {
    res.status(400).send("error", error);
  }
});

module.exports = router;
