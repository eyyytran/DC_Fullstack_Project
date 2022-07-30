'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserProjects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      projectID: {
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
    await queryInterface.dropTable('UserProjects');
  }
};