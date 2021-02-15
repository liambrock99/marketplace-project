/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding firstName and lastName
    await queryInterface.addColumn('Users', 'firstName', {
      allowNull: true,
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('Users', 'lastName', {
      allowNull: true,
      type: Sequelize.STRING
    });

    // Removing username column
    await queryInterface.removeColumn('Users', 'username');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');
    await queryInterface.addColumn('Users', 'username', {
      allowNull: false,
      type: Sequelize.STRING,
    })
  }
};
