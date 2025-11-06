const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/heirloom');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  walletAddress: { type: DataTypes.STRING, unique: true }
});

module.exports = { sequelize, User };
