import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('info', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const connectdb = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default connectdb;
