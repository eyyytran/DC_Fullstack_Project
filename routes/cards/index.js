const express = require("express");
const { Cards } = require("../../db/models");
const router = express.Router();
const { v4 } = require("uuid");

// create new card
// status options: toDo, inProgress, review, complete
router.post("/create_card", async (req, res) => {
  const { listPosition, name, status, userID, projectID } = req.body;
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
    res.status(200).send("complete");
  } catch (error) {
    res.status(400).send("unable to complete");
    console.log(error);
  }
});

// get cards
router.post("/get_cards", async (req, res) => {
  const { projectID } = req.body;
  try {
    const allCards = await Cards.findAll({ where: { projectID: projectID } });
    res.status(200).json(allCards);
  } catch (error) {
    res.status(400).send("unable to complete");
    console.log(error)
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
    res.status(200).send("complete");
  } catch (error) {
    res.status(400).send("unable to complete");
    console.log(error)
  }
});

router.delete("/destroy_card", async (req, res) => {
  const { id } = req.body;
  try {
    const currentCard = await Cards.findOne({ where: { id: id } });
    currentCard.destroy();
    res.status(200).send("complete");
  } catch (error) {
    res.status(400).send("unable to complete");
    console.log(error)
  }
});

module.exports = router;
