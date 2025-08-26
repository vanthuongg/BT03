import bcrypt from 'bcrypt';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

const hashedPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const hashed = bcrypt.hashSync(password, salt);
            resolve(hashed);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllUsers = (): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

export const getUserById = (userId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

export const createUser = async (data: any): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPasswordFromBcrypt = await hashedPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashedPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve("Create user success!");
        }
        catch (error) {
            reject(error);
        }
    });
};

export const updateUser = (data: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                const allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve(undefined);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteUserById = (userId: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};