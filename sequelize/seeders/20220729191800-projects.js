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
     "Projects",
     [
       {
         id: v4(),
         name: "Runway",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         id: v4(),
         name: "Mindy",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         id: v4(),
         name: "Manhattan",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         id: v4(),
         name: "Front End",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         id: v4(),
         name: "Back End",
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
    await queryInterface.bulkDelete("Projects", null, {});
  }
};
