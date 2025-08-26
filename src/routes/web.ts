import express, { Application } from 'express';
import * as usercontroller from '../controllers/userController';

const router = express.Router();

const webRoutes = (app: Application) => {
    router.get('/', usercontroller.getHomePage);
    router.get('/about', usercontroller.getAboutPage);
    router.get('/crud', usercontroller.getCRUD);
    router.post('/post-crud', usercontroller.postCRUD);
    router.get('/get-crud', usercontroller.getAllCRUD);
    router.get('/edit-crud', usercontroller.getEditCRUD);
    router.post('/put-crud', usercontroller.putCRUD);
    router.get('/delete-crud', usercontroller.deleteCRUD);
    app.use('/', router);
};

export default webRoutes;
