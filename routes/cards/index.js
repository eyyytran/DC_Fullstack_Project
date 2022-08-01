const express = require("express");
const { Cards } = require("../../db/models");
const router = express.Router();
const { v4 } = require("uuid");

// listPosition: DataTypes.INTEGER,
//   name: DataTypes.STRING(50),
//   description: DataTypes.STRING(255),
//   status: DataTypes.STRING,
//   userId: DataTypes.UUID,
//   projectId: DataTypes.UUID,

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
    console.log(newCard);
    const card = await Cards.create(newCard);
    res.status(200).send(card);
  } catch (error) {
    //   console.log(error);
    res.status(400).send(error);
  }
});

// project page
// get cards
router.get("/get_cards", async (req, res) => {
  const allCards = await Cards.findAll();
  res.render("cards", {
    locals: { allCards },
  });
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
      updatedAt: new Date()
    });
    const card = await currentCard.save();
    res.status(200).send(card);
  } catch (error) {
    res.send("could not find");
  }
});

router.delete("/destroy_card", async (req, res) => {
  const { id } = req.body;
  try {
    const currentCard = await Cards.findOne({ where: { id: id } });
    currentCard.destroy();
    res.send("Card destroyed");
  } catch (error) {
    res.send("could not destroy");
  }
});

module.exports = router;
