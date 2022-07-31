"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cards", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      listPosition: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      description: {
        type: Sequelize.STRING(255),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userID: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      projectID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cards");
  },
};
