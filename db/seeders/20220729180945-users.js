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
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "dadjokes4days@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Amanda",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "lizardqueen@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Blake",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "blkeeee@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Carlos",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "vrracer4lyfe@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Rahmin",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "ihateEUvalorplayers@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Ethan",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "mustacheenthusiast23@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Olivia",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "IllbeyourBOSSsomeday@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Stacy",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "ifItoldyouIdhavetokillyou@fbi.gov",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "West",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "2020firemancalendarMrMarch@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          username: "Violet",
          password: await encryptPassword("ABCDEabcde12345!!"),
          email: "ohboywhatdidyoudo@yahoo.com",
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
