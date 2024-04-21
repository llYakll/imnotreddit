const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    async beforeCreate(user) {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    },
    async beforeUpdate(user) {
      if (user.changed('password')) {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
      }
    }
  }
});

module.exports = User;