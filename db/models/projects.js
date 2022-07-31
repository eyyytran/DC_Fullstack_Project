"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Projects.belongsToMany(models.Users, { through: "UserProjects" });
    }
  }
  Projects.init(
    {
      name: DataTypes.STRING(50),
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Projects",
    }
  );
  return Projects;
};
