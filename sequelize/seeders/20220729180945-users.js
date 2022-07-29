"use strict";
const { v4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
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
      "Users",
      [
        {
          id: v4(),
          username: "Joe",
          password: "ilovevarcharmander",
          email: "dadjokes4days@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Amanda",
          password: "benjilove",
          email: "lizardqueen@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Blake",
          password: "imissbandpractice",
          email: "blkeeee@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Carlos",
          password: "gimmaVRcar",
          email: "vrracelyfe@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Rahmin",
          password: "valormakesmescream",
          email: "ihateEUvalorplayers@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
