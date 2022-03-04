'use strict';

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
  //   await queryInterface.bulkInsert('Ways', [{
  //     from: 'Коробка',
  //     to: 'Fair',
  //     passengerCount: new Date(),
  //     startAt: new Date(),
  //     description: 'АААФЫВФЫВФАВЫАФЫ',
  //     userId: 1,
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
