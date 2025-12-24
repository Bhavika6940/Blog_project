const { Sequelize } = require('sequelize');

const DB_NAME = 'BlogDb';
const DB_USER = 'root';
const DB_PASS = '';
const DB_HOST  = 'localhost';
const DIALECT = 'mysql';

const sequelizeWithoutDB = new Sequelize('', DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: DIALECT,
        logging: false
        });

 const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
            host : DB_HOST,
            dialect : DIALECT,
            logging : false
        });


const createDatabaseAndConnect = async () => {
    try{
        // connect to database without specifying database
        await sequelizeWithoutDB.authenticate();
        console.log('Connected to MYSQL server successfully!');
        
        await sequelizeWithoutDB.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        console.log(`Database "${DB_NAME}" created or already exists`);

        //connect to the newly created database
        await sequelize.authenticate();
        console.log(`Connected to database "${DB_NAME}" successfully!`);

    }
    catch(err){
        console.error('Error connecting to MySQL: ', err);
    }
}



module.exports = {createDatabaseAndConnect, sequelize};
