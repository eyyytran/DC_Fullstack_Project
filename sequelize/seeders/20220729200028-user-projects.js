'use strict';

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
     "UserProjects",
     [
       {
         userID: "41e1ceaa-3bd6-4cb3-b838-e8547c4b1db9",
         projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userID: "0653cb9e-ef20-4853-a2cc-73e8cb54b749",
         projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userID: "95e54e16-1780-41f8-ba2a-bc0ee21fd596",
         projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userID: "b8e0d9c4-801c-4f3c-94eb-8b79e0831ab9",
         projectID: "70d894b3-45cd-4859-a38a-e2489741f828",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         userID: "afbc0c43-ea98-4d9d-9a80-49fee6f3a661",
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
  }
};
