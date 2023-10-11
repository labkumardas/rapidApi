'use strict';

/** @type {import('sequelize-cli').Migration} */

const { v4: uuidv4 } = require('uuid');
var bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      external_id:uuidv4(),
      lastName: 'Doe',
      email: 'admin@gmail.com',
      phone: '6290176008',
      password: bcrypt.hashSync("12345678", 8),
      is_admin:"0",

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
