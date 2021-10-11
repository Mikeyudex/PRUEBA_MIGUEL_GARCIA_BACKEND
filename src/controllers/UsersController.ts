const ValidateToken = require('../middlewares/verifyToken')
const validateToken = new ValidateToken()
import UserBusiness from '../business/UsersBusiness'

let userBusiness = new UserBusiness();

const getUser = async (req:any, res:any) => {

    try {
        const {id} = req.params
        await validateToken.verify(req.token)
        let response = await userBusiness.getUser(id)
        res.status(200).json({body: response})
    
    } catch (error) {
        
        res.status(500).json({errorMessage: error})
    }
     
}


const createUser = async (req:any, res:any) => {

    try {
        await validateToken.verify(req.token)
        await userBusiness.createUser(req.body)
        res.status(200).send('User Created!')
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Ha ocurrido un error interno"})
    }
     
}

const updateUser = async (req:any, res:any) => {
    try {
        const {id} = req.params
        await validateToken.verify(req.token)
        let userUpdate = await userBusiness.updateUser(id, req.body)
        res.status(200).json(userUpdate)
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Ha ocurrido un error interno"})
    }
}

const deleteUser = async (req:any, res:any) => {
    try {
        const {id} = req.params
        await validateToken.verify(req.token)
        await userBusiness.deleteUser(id)
        res.status(200).send(`Usuario con id [${id}] eliminado.`)
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Ha ocurrido un error interno"})
    }
}


const activeUser = async (req:any, res:any) => {
    try {
        const {id} = req.params
        await validateToken.verify(req.token)
        await userBusiness.activeUser(id)
        res.status(200).send(`Usuario con id [${id}] activado.`)
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Ha ocurrido un error interno"})
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    activeUser,
    getUser
}