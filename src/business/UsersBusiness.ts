import User from '../models/Users'


export default class UserBusiness {

    public getUser(id: string) {

        return new Promise<void>(async (resolve, reject) => {
            try {
                
                let response = await User.findById(id).exec();
                if(response != null){
                    resolve(response)
                }else{
                    reject(`No se ha encontrado el usuario con id [${id}]`)
                }
                
            } catch (error) {
                console.log(error)
                reject('ha ocurrido un error al encontrar el usuario.')
            }

        })


    }

    public createUser(data: object) {

        return new Promise<void>(async (resolve, reject) => {
            try {
                
                const user = new User(data);
                await user.save()

                resolve()
            } catch (error) {
                reject({errorMessage: 'ha ocurrido un error al crear el usuario.'})
            }

        })


    }

    public updateUser(id: string, data: object) {

        return new Promise<void>(async (resolve, reject) => {
            try {
                
                let doc = await User.findOneAndUpdate({_id: id}, data, {
                    new: true
                });

                resolve(doc)

            } catch (error) {
                reject({errorMessage: 'ha ocurrido un error al actualizar  el usuario.'})
            }

        })
    }


    public deleteUser(id: string) {

        return new Promise<void>(async (resolve, reject) => {
            try {
                
                let doc = await User.deleteOne({_id: id});

                resolve()

            } catch (error) {
                reject({errorMessage: 'ha ocurrido un error al eliminar el usuario.'})
            }

        })
    }

    public activeUser(id: string) {

        return new Promise<void>(async (resolve, reject) => {
            try {
                
                await User.findOneAndUpdate({_id: id}, {active: true}, {
                    new: true
                });

                resolve()

            } catch (error) {
                reject({errorMessage: 'ha ocurrido un error al activar el usuario.'})
            }

        })
    }

}