import jwt from 'jsonwebtoken'
const configs = require('../../index.json')
const ValidateUser = require('../middlewares/validateUser')


const AuthLogin = async (req: any, res: any) => {

    try {
        
        const { username } = req.body

        await ValidateUser(username)

        const token = jwt.sign({ username }, configs.SecretKey, {
            expiresIn: 1440
        }); //Generar token para el usuario

        res.status(200).json({
            message: 'Autenticación correcta',
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({error: true, errorMessage: error})
    }

}

module.exports = AuthLogin