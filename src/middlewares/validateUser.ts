import DaoUsers from '../dao/Users.dao'
const users = new DaoUsers()


//Valida si el usuario existe en la base de datos
const validateUser = async (username: string) => {
    return new Promise<void>(async (resolve, reject) => {

        try {
            const resultado = await users.getUserByUsername(username)

            if(resultado != null) {
                resolve()
            } else {
                reject("Lo sentimos no existe el usuario.")
            }
        } catch (error) {
            reject(error)
        }



    })

}

module.exports = validateUser;