"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProjects.belongsTo(models.Users, {
        foreignKey: "id",
        as: "user",
      });
      UserProjects.belongsTo(models.Projects, {
        foreignKey: "id",
        as: "project",
      });
    }
  }
  UserProjects.init(
    {
      userID: DataTypes.UUID,
      projectID: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "UserProjects",
    }
  );
  return UserProjects;
};
