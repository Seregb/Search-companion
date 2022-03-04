'use strict';

const user = require("../models/user");

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
  //   await queryInterface.bulkInsert('Users', [{
  //     email: 'newuser@user.com',
  //     name: 'John Doe',
  //     password: '123',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
