
import { Request, Response } from 'express';
import * as CRUDService from '../services/CRUDService';

export const getHomePage = async (req: Request, res: Response) => {
    return res.render('homepage.ejs');
};

export const getAboutPage = (req: Request, res: Response) => {
    return res.render('test/about.ejs');
};

export const getAllCRUD = async (req: Request, res: Response) => {
    try {
        const data = await CRUDService.getAllUsers();
        return res.render('users/findAllUser.ejs', { datalist: data });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

export const getCRUD = (req: Request, res: Response) => {
    return res.render('crud.ejs');
};

export const postCRUD = async (req: Request, res: Response) => {
    try {
        await CRUDService.createUser(req.body);
        res.redirect('/get-crud');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

export const getEditCRUD = async (req: Request, res: Response) => {
    const userId = req.query.id as string;
    if(userId){
        const userData = await CRUDService.getUserById(userId);
        return res.render('users/updateUser.ejs', {
            data: userData
        });
    }
    else{
        return res.send('Không lấy được id');
    }
};

export const putCRUD = async (req: Request, res: Response) => {
    const data = req.body;
    await CRUDService.updateUser(data);
    res.redirect('/get-crud');
};

export const deleteCRUD = async (req: Request, res: Response) => {
    const userId = req.query.id as string;
    if(userId){
        await CRUDService.deleteUserById(userId);
        return res.redirect('/get-crud');
    }
    else{
        return res.send("Không tìm thấy user");
    }
};
