import VerifyToken from '../middlewares/verifyToken'
const validateToken = new VerifyToken()

import DaoUsers from '../dao/Users.dao'
const users = new DaoUsers()


const createUser = async (req:any, res:any) => {

    try {
        await validateToken.verify(req.token)
        await users.createUser(req.body)
        res.status(200).send('User Created!')
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Ha ocurrido un error interno"})
    }
     
}

module.exports = {
    createUser  
}