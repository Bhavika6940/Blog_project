const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('BlogDb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Sequilize connected to MySQL successfully!');
    }
    catch (error) {
        console.error('Unable to connect to MYSQL:', error);
    }
};

testConnection();
module.exports = sequelize;