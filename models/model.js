const Sequelize = require('sequelize');
const sequelize = new Sequelize('MyApplication', 'postgres', '9200163022@', {
    host: 'localhost',
    dialect: 'postgres'
  });
const User = sequelize.define('projects', {

    number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
  
    },
    image_uploaded:{
      type:Sequelize.STRING,
      allowNull:false
    }
  }, {
    // options
  });
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = User
