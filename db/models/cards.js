"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cards.belongsTo(models.Users, {
        foreignKey: "id",
        as: "user",
      });
      Cards.belongsTo(models.Projects, {
        foreignKey: "id",
        as: "project",
      });
    }
  }
  Cards.init(
    {
      listPosition: DataTypes.INTEGER,
      name: DataTypes.STRING(50),
      description: DataTypes.STRING(255),
      status: DataTypes.STRING,
      userID: DataTypes.UUID,
      projectID: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Cards",
    }
  );
  return Cards;
};
