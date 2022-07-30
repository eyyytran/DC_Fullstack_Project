"use strict";
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

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
          password: await encryptPassword("ilovevarcharmander"),
          email: "dadjokes4days@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Amanda",
          password: await encryptPassword("benjilove"),
          email: "lizardqueen@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Blake",
          password: await encryptPassword("imissbandpractice"),
          email: "blkeeee@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Carlos",
          password: await encryptPassword("gimmeaVRcar"),
          email: "vrracelyfe@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Rahmin",
          password: await encryptPassword("valormakesmescream"),
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
