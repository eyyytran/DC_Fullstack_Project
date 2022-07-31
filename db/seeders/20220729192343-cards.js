'use strict';
const { v4 } = require("uuid");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert(
        "Cards",
        [
          {
            id: v4(),
            listPosition: 1,
            name: "Look fabulous",
            status: "inProgress",
            userID: "63817f02-182b-49e1-9756-55e84957c522",
            projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: v4(),
            listPosition: 1,
            name: "Give the Blue Steel look",
            status: "toDo",
            userID: "322ed5bf-31ed-4b41-976e-c61419be4501",
            projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: v4(),
            listPosition: 2,
            name: "Type slower",
            status: "review",
            userID: "9389ab34-19c8-442f-a3c3-9eee0b736d47",
            projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: v4(),
            listPosition: 1,
            name: "Breakdance fight",
            status: "review",
            userID: "227e944b-621d-4c8c-bb9e-0795de562233",
            projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: v4(),
            listPosition: 1,
            name: "Code while driving",
            status: "complete",
            userID: "7d9203c2-0750-4075-9821-da1d0b1dac6b",
            projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Cards", null, {});
  }
};
