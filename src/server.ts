
import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import connectdb from './config/configdb';
import webRoutes from './routes/web';
import db from './models/index';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
webRoutes(app);
connectdb();


if (db.sequelize) {
  db.sequelize.sync()
    .then(() => {
      console.log('Database synced!');
    })
    .catch((err: any) => {
      console.error('Error syncing database:', err);
    });
} else {
  console.error('Sequelize instance is undefined!');
}

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
