// src/models/index.js

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model } from 'sequelize';
import config from '../config/config.json';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];
const db: { [key: string]: any; sequelize?: Sequelize; Sequelize?: typeof Sequelize } = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig as any);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' || file.slice(-3) === '.ts'
    );
  })
  .forEach(file => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
