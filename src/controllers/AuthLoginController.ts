import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const configs = require('../../index.json')
const ValidateUser = require('../middlewares/validateUser')

/** 
     * Autentica al usuario, devolviendo un token
     * @param {Request} req
     * @param {Response} res
    */ 
const AuthLogin = async (req: Request, res: Response) => {

    try {
        const { username } = req.body

        if (username == undefined || null || username.length == 0) {

            res.status(500).json({ error: true, errorMessage: "Debe ingresar un username" })
        } else {
            
            await ValidateUser(username)

            const token = jwt.sign({ username }, configs.SecretKey); //Generar token para el usuario

            res.status(200).json({
                message: 'Autenticación correcta',
                token
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, errorMessage: error })
    }

}

module.exports = AuthLogin