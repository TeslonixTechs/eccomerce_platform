const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
});

sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.error('Database connection error:', err))

sequelize.sync({ alter: true }) // Ensures the table is created or updated
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error synchronizing database:', err));

module.exports = sequelize;