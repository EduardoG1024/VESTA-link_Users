import express from "express";
import { AddUserLinkEntity } from "../entity/profile-entity/addUserLink-entity.js";

export class ProfileControllers {

    static GetUserLinks = (req, res) => {
        try {
            return res.status(200).json({
                message: 'obtener links',
                error: error.message
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Ocurrió un error al obtener los links del usuario',
                error: error.message
            });
        }
    }

    static AddUserLink = async (req, res) => {
        try {
            if (!req.session.user) {
                throw new Error('USUARIO NO AUTENTICADO');
            }
            const {id} = req.session.user;
            const {url, category_1, category_2, category_3, isMusic} = req.body;

            const LINK = new AddUserLinkEntity(id, url, category_1, category_2, category_3, isMusic);
            LINK.DataValidation();
            LINK.ValidateURL();
            LINK.CreateEmbed();

            return res.status(200).json({
                message: 'Link guardado!',
                data: LINK,
            });

        } catch (error) {
            return res.status(400).json({
                message: 'Ocurrió un error al añadir el link del usuario',
                error: error.message
            });
        }
    }
}