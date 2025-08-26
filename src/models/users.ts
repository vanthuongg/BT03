import { Model, DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    class User extends Model {
        public id!: number;
        public email!: string;
        public password!: string;
        public firstName!: string;
        public lastName!: string;
        public address!: string;
        public phoneNumber!: string;
        public gender!: boolean;
        public image!: string;
        public roleId!: string;
        public positionId!: string;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;

        static associate?(models: any): void {}
    }

    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        image: DataTypes.STRING,
        roleId: DataTypes.STRING,
        positionId: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};